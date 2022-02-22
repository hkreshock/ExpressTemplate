def getEnvName(branchName) {
    if("staging".equals(branchName)) {
        return "staging";
    } else if ("master".equals(branchName)) {
        return "production";
    } else {
        return "development";
    }
}

pipeline {
	triggers {
		pollSCM('H/5 * * * *')
	}
	agent {
		label 'pacific'
	}
	options {
		timeout(time: 1, unit: 'HOURS') 
	}
	environment {
		NODE_ENV = getEnvName(env.BRANCH_NAME)
		DATABASE_URL = credentials('DEV_DB_SRV')
		NAME = 'backend_template_with_db'
		PORT = 5000
		HOME = '.'
	}
	stages {
		stage('Build and Test') { 
			agent {
				dockerfile {
					filename 'Dockerfile'
					additionalBuildArgs '-t backend_template_with_db'
					label 'pacific'
				}
			}
			steps {
				sh 'npm install'
				sh 'npm test'
			}
		}
		stage('Prep') {
			when {
				expression {
					return NODE_ENV != 'development';
				}
			}
			steps {
				script {
					try {
						sh 'docker stop ${NAME}'
						sh 'docker rm ${NAME}'
					} catch(Exception e) {
						echo 'Exception occurred: ' + e.toString()
					}
				}
			}
		}
		stage('Deploy') {
			when {
				expression {
					return NODE_ENV != 'development';
				}
			}
			steps {
				sh '''
					docker run \
						-d \
						-p ${PORT}:3000 \
						--name ${NAME} \
						-e DATABASE_URL=${DATABASE_URL}/exampleDb \
						-e TEST_DATABASE_URL=${DATABASE_URL}/testExampleDb \
						-e NODE_ENV=${NODE_ENV} \
						-e NAME=${NAME} \
						${NAME}
				'''
			}
		}
		stage('Cleanup') {
			when {
				expression {
					return NODE_ENV != 'development';
				}
			}
			steps {
				sh 'docker image prune -af'
			}
		}
	}
}