const mysql = require('mysql');
const session = require('express-session')
const express = require('express');
const app = new express();
const port = 3000;
const PATH = require('path');
const bodyParser = require("body-parser");
const {
    send
} = require('process');
require('dotenv').config();

app.use('/', express.static(PATH.join(__dirname, 'src')))
app.set('views', PATH.join(__dirname, '/src/view'));
app.set('view engine', 'pug')
app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
}))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {

    res.render('landing-page', {
        isLoggedIn: req.session.isLoggedIn
    })

})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/sign-up', (req, res) => {
    res.render('sign-up')
})

app.post('/auth', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    req.session.isLoggedIn = false;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (results.length > 0) {
                req.session.isLoggedIn = true;
                req.session.username = username;
                res.redirect('/dashboard');
            } else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
    app.get('/dashboard', function (req, res) {
        if (req.session.isLoggedIn) {

            res.render('dashboard', {
                isLoggedIn: req.session.isLoggedIn
            })
        } else {
            res.send('Please login to view this page!');
        }
        res.end();
    });
});






app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodelogin'
})