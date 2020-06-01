const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const PORT = process.env.PORT || 4000;

const controllers = require('./controllers');
const authRequired = require('./middleware/authRequired');

const app = express();

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  store: new MongoStore({
    url: "mongodb://localhost:27017/habit",
  }),
  secret: "Gucci",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2,
  },
}));

app.get('/', (req, res) => {
  res.render('index');
})

app.use('/', controllers.auth);


app.use('/habits', authRequired, controllers.habit);
app.use('/activities', authRequired, controllers.activity);


app.listen(PORT, () => {
  console.log(`Server started and listening on port ${PORT}`);
})

