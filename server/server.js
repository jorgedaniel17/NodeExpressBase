const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());

router(app);

app.listen(3021, () => {
    console.log(`Listening at port ${chalk.red('3021')}`);
});
