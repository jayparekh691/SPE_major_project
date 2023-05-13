// const yenv = require('yenv')
// require('dotenv').config()
let env = null

/*
 * OLD ORIGINAL CONFIG
 * If production environment then use the env.yaml file (generated via Ansible Vault + Playbook)
 * for the environment variables.
 * If testing environment then use the env-enc.yaml file (which will be decrypted in the Jenkins pipeline).
 * And if in development environment, use the env-local.yaml file.
 */
// if (process.env.NODE_ENV == 'production')
// 	env = yenv()
// else if (process.env.NODE_ENV == 'test')
// 	env = yenv('env-enc.yaml')
// else if (process.env.NODE_ENV == 'production-heroku')
// 	env = process.env
// else
// 	env = yenv('env-local.yaml')

/*
NEW CONFIG FOR K8s DEPLOYMENT
*/
env = process.env

// const PORT = 3001
// const MONGODB_URI =
//   'mongodb+srv://jayparekh:rock123A@production.074bxra.mongodb.net/?retryWrites=true&w=majority'
// const SECRET = env.SECRET

// env = process.env

const PORT = env.PORT
const MONGODB_URI = env.MONGODB_URI

export default { PORT, MONGODB_URI }
