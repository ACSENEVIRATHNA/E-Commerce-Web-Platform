/* groovylint-disable NestedBlockDepth */
pipeline {
    agent any

    stages {
        stage('Cleanup') {
            parallel {
                stage('Clean Up frontend') {
                    steps {
                        script {
                            // Stop and remove any running containers with the name "frontend"
                            sh '''
                            if [ "$(docker ps -qa -f name=frontend)" ]; then
                                docker stop frontend
                                docker rm frontend
                            fi
                            '''
                            sh '''

                        # Remove the existing image named "frontend" if it exists
                        if [ "$(docker images -q frontend)" ]; then
                            docker rmi -f frontend
                        fi
                        '''
                        }
                    }
                }
                stage('Clean Up backend') {
                    steps {
                        script {
                            // Stop and remove any running containers with the name "backend"
                            sh '''
                    if [ "$(docker ps -qa -f name=backend)" ]; then
                        docker stop backend
                        docker rm backend
                    fi
                    '''
                            sh '''

                    # Remove the existing image named "backend" if it exists
                    if [ "$(docker images -q backend)" ]; then
                        docker rmi -f backend
                    fi
                    '''
                        }
                    }
                }
            }
        }
        stage('Docker Build') {
            parallel {
                stage('Build Frontend') {
                    steps {
                        script {
                            // Build the Docker image
                            sh 'docker build -t frontend ./frontend'
                        }
                    }
                }
                stage('Build Backend') {
                    steps {
                        script {
                            // Build the Docker image
                            sh 'docker build -t backend ./backend'
                        }
                    }
                }
            }
        }
        stage('Run Docker Images') {
            parallel {
                stage('Run Frontend') {
                    steps {
                        script {
                            // Run the Docker container
                            sh 'docker run -d --name frontend -p 3000:3000 frontend'
                        }
                    }
                }
                stage('Run Backend') {
                    steps {
                        script {
                            // Run the Docker container
                            sh 'docker run -d --name backend -p 4000:4000 backend'
                        }
                    }
                }
            }
        }
    }
}
