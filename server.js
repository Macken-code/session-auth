const  express = require('express');
const sessions = require('express-session');
const HomeHandler = require('./handlers/home.js');
const LoginHandler = require('./handlers/login.js');
const ProcessLoginHandler = require('./handlers/process-login.js');
const LogoutHandler = require('./handlers/logout.js');
const MySQLStore = require('express-mysql-session')(sessions);


const app = express();

const options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'session_test'
};

const sessionStore = new MySQLStore(options);

app.use(
    sessions({
        secret: 'zekbrein',
        store: sessionStore,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        },
        resave: true,
        saveUninitialized: false
    })
)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// @todo register routes
app.get('/', HomeHandler);
app.get('/login', LoginHandler);
app.post('/process-login', ProcessLoginHandler);
app.get('/logout', LogoutHandler);


app.listen(3000, () => {
  console.log(`Server Running at port 3000`);
});

// Optionally use onReady() to get a promise that resolves when store is ready.
sessionStore.onReady().then(() => {
	// MySQL session store ready for use.
	console.log('MySQLStore ready');
}).catch(error => {
	// Something went wrong.
	console.error(error);
});



