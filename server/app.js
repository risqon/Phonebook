require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");

const firebase = require("firebase/app")
require("firebase/storage")

const firebaseConfig = {
    apiKey: "AIzaSyBj0_0wxWy13mKTdOcGk891fY4emdZ6JgI",
    authDomain: "phonebook-313.firebaseapp.com",
    databaseURL: "https://phonebook-313-default-rtdb.firebaseio.com",
    projectId: "phonebook-313",
    storageBucket: "phonebook-313.appspot.com",
    messagingSenderId: "287680863787",
    appId: "1:287680863787:web:b3f0cae934bbb60b65146e",
    measurementId: "G-TLX7CGXJM3"
};

firebase.initializeApp(firebaseConfig);

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);

const phoneSchema = require('./graphQl').phoneSchema;
app.use('/graphql', cors(), graphqlHTTP({
    schema: phoneSchema,
    rootValue: global,
    graphiql: true
}))

module.exports = app;
