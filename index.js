//Modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
app.use(cors());
//Controllers 
require('./controllers/database')(mongoose);
require('./controllers/useRoutes')(app);
//Security key check
if(!config.get('jwtKey')){
    console.log('Secret key is not set, exiting...');
    process.exit(1);
};
app.use('/uploads', express.static(__dirname + '/uploads'));

app.listen(4000, () => console.log('Server running at port 4000'));
