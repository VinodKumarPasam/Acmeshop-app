pipeline {

    agent any

    stages {

        stage ("build-user-service") {

            steps {

                sh ''' 
                     docker build -t acmeshop-user-service:test ./acmeshop-user-service
                '''
            }
        }
    }