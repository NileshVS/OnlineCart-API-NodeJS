const contact = require('../routes/contact.routes');

module.exports = (app) => {
    app.use(express.json());
    app.use('/api', contact);
}