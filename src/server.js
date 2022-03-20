const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const path = require('path');
const {logger} = require('./middleware/logEvents');
const {errorHandler} = require('./middleware/errorHandler');
const PORT = process.env.PORT || 5000;

app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/register', require('./register/register.router'));
app.use('/auth', require('./auth/auth.router'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.all('*', (req, res) => {
  res.status(404).json({error: '404 Not Found'});
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
