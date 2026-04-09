pipeline {
    agent any

    environment {
        DOCKER_IMAGE    = "nadil95/setupdesk-frontend:latest"
        EC2_HOST        = "13.42.33.166"
        EC2_USER        = "ubuntu"
        SSH_CREDENTIALS = "ssh-setupdesk" // Jenkins credential ID for SSH key
        APP_DIR         = "/home/ubuntu/setupdesk"
        PORT            = "4173"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/YOUR_GITHUB_USERNAME/setupdesk.git'
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    ),
                    string(
                        credentialsId: 'VITE_FORMSPREE_ID',
                        variable: 'FORMSPREE_ID'
                    )
                ]) {
                    sh '''
                        echo "Logging in to Docker Hub..."
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                        echo "Building Docker image..."
                        export DOCKER_BUILDKIT=0
                        docker build \
                            --build-arg VITE_FORMSPREE_ID=$FORMSPREE_ID \
                            -t $DOCKER_IMAGE .

                        echo "Pushing image to Docker Hub..."
                        docker push $DOCKER_IMAGE

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent([SSH_CREDENTIALS]) {
                    sh '''
                        echo "Preparing app directory on EC2..."
                        ssh -o StrictHostKeyChecking=no $EC2_USER@$EC2_HOST "mkdir -p $APP_DIR"

                        echo "Copying compose file to EC2..."
                        scp -o StrictHostKeyChecking=no docker-compose.yml $EC2_USER@$EC2_HOST:$APP_DIR/docker-compose.yml

                        echo "Deploying on EC2..."
                        ssh -o StrictHostKeyChecking=no $EC2_USER@$EC2_HOST "
                            cd $APP_DIR

                            echo 'Stopping old container...'
                            sudo docker stop setupdesk-app 2>/dev/null || true
                            sudo docker rm   setupdesk-app 2>/dev/null || true

                            echo 'Pulling latest image...'
                            sudo docker pull $DOCKER_IMAGE

                            echo 'Starting container...'
                            sudo docker run -d \
                                --name setupdesk-app \
                                --restart unless-stopped \
                                -p $PORT:$PORT \
                                $DOCKER_IMAGE

                            echo 'Running containers:'
                            sudo docker ps --filter name=setupdesk-app
                        "
                    '''
                }
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    sleep 10
                    curl --retry 5 --retry-delay 3 --silent --fail \
                        http://$EC2_HOST:$PORT/ > /dev/null \
                        && echo "SetupDesk is live at http://$EC2_HOST:$PORT" \
                        || echo "Warning: site not reachable — check EC2 security group port $PORT"
                '''
            }
        }
    }

    post {
        success {
            echo "Deployment successful! SetupDesk: http://${EC2_HOST}:${PORT}"
        }
        failure {
            echo "Pipeline failed — check logs above."
        }
        always {
            cleanWs()
        }
    }
}
