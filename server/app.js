var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');const firebase = require("firebase");
const bodyParser = require('body-parser');
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");

const config = {
    apiKey: "AIzaSyCVkPkEdvxEYm9aknhtBSgOx_k_uDlbf4Q",
    authDomain: "risqon-2e358.firebaseapp.com",
    databaseURL: "https://risqon-2e358.firebaseio.com/",
    projectId: "risqon-2e358",
    storageBucket: "risqon-2e358.appspot.com",
    messagingSenderId: "913658410853"
};
firebase.initializeApp(config);
//console.log(config,'conek firebise')

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
