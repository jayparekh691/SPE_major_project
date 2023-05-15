let env = null

env = process.env

// const PORT = 3001
// const MONGODB_URI =
//   'mongodb+srv://jayparekh:rock123A@production.074bxra.mongodb.net/?retryWrites=true&w=majority'
// const SECRET = env.SECRET

let MONGODB_URI
const PORT = env.PORT
MONGODB_URI = env.MONGODB_URI


export default { PORT, MONGODB_URI }
