pipeline {
    agent any
   
    stages {
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'main', url: 'https://github.com/ACSENEVIRATHNA/E-Commerce-Web-Platform'
                }
            }
        }
       
        stage('Build Docker Image') {
            steps {
                script {
                    bat 'docker compose up'
                }
            }
        }
       
        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub-pass', variable: 'hub-password')]) {
                    script {
                        sh "docker login -u ac990919 -p '${hub-password}'"
                    }
                }
            }
        }
       
        stage('Push Image') {
            steps {
                script {
                    sh 'docker push ac990919/4206-senevirathna:${BUILD_NUMBER}'
                }
            }
        }
    }
   
    post {
        always {
            script {
                sh 'docker logout'
            }
        }
    }
}