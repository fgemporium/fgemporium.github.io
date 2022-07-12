const express = require('express');
const app = express();
const path = require('path');
// const db = require('./db')
// const session = require('express-session');
// const pgSession = require('connect-pg-simple')(session)

console.log("Server up & running");

const homeRouter = require('./routes/home.routes');
const tutorialsRouter = require('./routes/tutorials.routes')


//middleware - EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware - static
app.use(express.static(path.join(__dirname, 'public')));

//middleware - parametri u URL-u i req.body
app.use(express.urlencoded({extended: true}));

//middleware - za fetcheve
app.use(express.json())

//middleware - za session
// app.use(session({
//     store: new pgSession({
//         pool: db.pool
//     }),
//     secret: "nekistring",
//     resave: false,
//     saveUninitialized: true //jer odma pratimo sjednicu neloginanog
// }))

//rute
app.use('/', homeRouter);
app.use('/tutorials', tutorialsRouter);



//redirect u server.jsu
app.get('/home', function (req, res){
    res.redirect('/');
})

app.listen(3000);