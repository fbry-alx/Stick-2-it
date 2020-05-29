const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const PORT = process.env.PORT || 4000;

const controllers = require('./controllers');

const app = express();

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('hello!');
})


app.listen(PORT, () => {
  console.log(`Server started and listening on port ${PORT}`);
})
