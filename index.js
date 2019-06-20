const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const compression = require('compression')

const app = express()
const server = require('http').Server(app);


const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;
const APP_SECRET = process.env.APP_SECRET;
const PORT = process.env.PORT || 4000;

const websockets = require('./modules/shared/vendors/websockets');
const websocketsEvents = require('./modules/shared/vendors/websockets/events');
const registerSocketHandlers = require('./modules/shared/vendors/websockets/registerHandlers');


// Initialize sockets
const socketConnection = websockets.createSocketConnection(server);

socketConnection.on('connection', (socket) => {
    console.log('client connected', socket.id);
    setTimeout(() => {
        console.log('sending heartbeat to ', socket.id);
        socket.emit(websocketsEvents.HEARTBEAT, { hello: 'world' });
    }, 5000);
    // Initialize handlers
    // registerSocketHandlers.registerHandlers(socket, require('./modules//websocketsHandlers').handlers)
})


mongoose.connect(DB_CONNECTION_URL) // connect to our mongoDB database //TODO: !AA: Secure the DB with authentication keys
console.log(`====== Connected to database ${DB_CONNECTION_URL} ===========`)

app.all('/*', (req, res, next) => {
    // CORS headers - Set custom headers for CORS
    res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token, X-Vw-Anonymous-Id, X-Key, Cache-Control, X-Requested-With');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});


app.use(bodyParser.json({ limit: '50mb' })) // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })) // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })) // parse application/x-www-form-urlencoded

app.use(morgan('dev')) // use morgan to log requests to the console
app.use(methodOverride('X-HTTP-Method-Override')) // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(compression({ threshold: 0 }))

require('./router/index.js')(app) // pass our application into our routes

server.listen(PORT)
console.log(`Magic happens on port ${PORT}`)       // shoutout to the user
console.log(`==== Running in ${process.env.NODE_ENV} mode ===`)
exports = module.exports = app             // expose app
// applyScriptMediaOnArticleOnAllArticles()
