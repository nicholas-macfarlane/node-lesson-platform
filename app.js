require('dotenv').config();
const express = require('express');
const hbs = require('express-handlebars');
const { auth } = require('express-openid-connect');
const authConfig = require('./config/auth.js');
const fs = require('fs');
const http = require('http');
const https = require('https');
const PORT = process.env.HTTPS_PORT || 3000;
const cookieParser = require('cookie-parser');
const session = require('express-session');

const privateKey  = fs.readFileSync(process.env.KEY_PATH, 'utf8');
const certificate = fs.readFileSync(process.env.CERT_PATH, 'utf8');
const credentials = {key: privateKey, cert: certificate};

const app = express();
app.engine('hbs', hbs(require('./config/engine.js')));
app.set('views', './views');
app.set('view engine', 'hbs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(authConfig));

// calling this endpoint generates 100 users and lessons
// as test data for the db
const populate = require('./pgsql/populate.js');
app.get('/populate', (req, res) => {
    populate();
    res.status(200).send('populated(+100)');
});

app.use('/lessons', require('./routes/lessons.js'));
app.use('/leaderboard', require('./routes/leaderboard.js'));
app.use('/', require('./routes/index.js'));

app.use(cookieParser());
app.use(session({secret: process.env.SESSION_SECRET}));

const httpTraffic = express();
httpTraffic.use(auth(authConfig));
httpTraffic.use('*', require('./routes/httpRoutes.js'));

const httpServer = http.createServer(httpTraffic);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(process.env.HTTP_PORT);
httpsServer.listen(PORT,console.log(`Server up on port ${PORT}`));
