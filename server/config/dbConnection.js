const mongoose = require('mongoose');

const debConnection = () => {
    mongoose.connect(process.env.DB_connection_url, {
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true
        })
        .then(() => {
            console.log('mongodb connected successfully');
        }).catch((err) => {
            console.log('mongodb not connected', err);
        })
}

module.exports = debConnection