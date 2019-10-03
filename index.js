//Modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Controllers 
require('./controllers/database')(mongoose);
require('./controllers/useRoutes')(app);

