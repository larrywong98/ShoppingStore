const mongoose = require('mongoose');
//npm install mongoose

mongoose.connect('mongodb://localhost:27017/ShoppingDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
const userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

const User = mongoose.model('User', userSchema);

module.exports =  User ;
