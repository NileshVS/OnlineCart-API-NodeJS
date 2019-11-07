module.exports = (mongoose) => {
    mongoose.connect('mongodb://localhost/OnlineCart', {useNewUrlParser: true, useUnifiedTopology : true})
    .then(() => console.log('Bingo! Connected successfully to DB'))
    .catch((err) => console.log('Connection to DB failed', err.message));
}