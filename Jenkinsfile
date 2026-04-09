pipeline {
    agent any

    environment {
        IMAGE_NAME   = 'setupdesk-frontend'
        CONTAINER    = 'setupdesk-app'
        PORT         = '4173'
        FORMSPREE_ID = credentials('VITE_FORMSPREE_ID')   // Jenkins credential ID
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                    docker build \
                      --build-arg VITE_FORMSPREE_ID=${FORMSPREE_ID} \
                      --no-cache \
                      -t ${IMAGE_NAME}:${BUILD_NUMBER} \
                      -t ${IMAGE_NAME}:latest \
                      .
                """
            }
        }

        stage('Stop & Remove Old Container') {
            steps {
                sh """
                    docker stop ${CONTAINER} || true
                    docker rm   ${CONTAINER} || true
                """
            }
        }

        stage('Run New Container') {
            steps {
                sh """
                    docker run -d \
                      --name ${CONTAINER} \
                      --restart unless-stopped \
                      -p ${PORT}:${PORT} \
                      ${IMAGE_NAME}:latest
                """
            }
        }

        stage('Health Check') {
            steps {
                sh """
                    sleep 5
                    curl -sf http://localhost:${PORT}/ || (echo 'Health check failed' && exit 1)
                    echo 'Deployment successful — SetupDesk is live on port ${PORT}'
                """
            }
        }

        stage('Cleanup Old Images') {
            steps {
                sh "docker image prune -f --filter 'label!=keep'"
            }
        }
    }

    post {
        success {
            echo "✅ SetupDesk deployed successfully — build #${BUILD_NUMBER}"
        }
        failure {
            echo "❌ Deployment failed — rolling back"
            sh """
                docker stop ${CONTAINER} || true
                docker rm   ${CONTAINER} || true
                docker run -d \
                  --name ${CONTAINER} \
                  --restart unless-stopped \
                  -p ${PORT}:${PORT} \
                  ${IMAGE_NAME}:previous || true
            """
        }
    }
}
