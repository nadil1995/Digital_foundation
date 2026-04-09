pipeline {
    agent any

    environment {
        DOCKER_IMAGE     = "nadil95/setupdesk-frontend:latest"
        EC2_HOST         = "13.42.33.166"
        EC2_USER         = "ubuntu"
        SSH_CREDENTIALS  = "ssh-setupdesk"
        APP_DIR          = "/home/ubuntu/setupdesk"
        PORT             = "4173"
        FORMSPREE_ID     = "mkopyqev"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/nadil1995/Digital_foundation.git'
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
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
                    sh """
                        ssh -o StrictHostKeyChecking=no $EC2_USER@$EC2_HOST '
                            mkdir -p $APP_DIR

                            echo "Stopping old container..."
                            docker stop setupdesk-app 2>/dev/null || true
                            docker rm   setupdesk-app 2>/dev/null || true

                            echo "Pulling latest image..."
                            docker pull $DOCKER_IMAGE

                            echo "Starting container..."
                            docker run -d \\
                                --name setupdesk-app \\
                                --restart unless-stopped \\
                                -p $PORT:$PORT \\
                                $DOCKER_IMAGE

                            echo "Running containers:"
                            docker ps --filter name=setupdesk-app
                        '
                    """
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
