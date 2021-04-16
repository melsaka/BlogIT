const mongoose = require('mongoose');

mongoose.plugin(require('mongoose-slug-updater'));

module.exports = () => {
    mongoose.connect(
        `mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
}