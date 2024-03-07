const mongoose = require('mongoose');
const {db} = require("/usr/src/app/src/helpers/configuration");

module.exports.connectDb = () => {
	mongoose.connect(db, {useNewUrlParser: true});
	
	return mongoose.connection;
};