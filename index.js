//Modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Controllers 
require('./controllers/database')(mongoose);
require('./controllers/useRoutes')(app);

app.listen(4000, () => console.log('Server running at port 4000'));
