
import app from './app.js'
import config from '../utils/config.js'
// import EventEmitter from "EventEmitter"
// const emitter = new EventEmitter()
// emitter.setMaxListeners(100)

app.listen(config.PORT, () => console.log('Server Started'))
