pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                echo 'AcmeShop CI pipeline is running'
            }
        }

        stage('Inspect') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }
    }
}