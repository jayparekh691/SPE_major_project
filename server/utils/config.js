let env = null

env = process.env



let MONGODB_URI
const PORT = env.PORT
MONGODB_URI = env.MONGODB_URI


export default { PORT, MONGODB_URI }
