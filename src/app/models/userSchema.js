import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config.js';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, minLength: 6 },
  isDelete: { type: Boolean, default: false },
  deletedDate: { type: Date, default: null },
});


userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next(); 

  const salt = bcrypt.genSaltSync(config.bcryt.salt);
  user.password = bcrypt.hashSync(user.password, salt);
  next();
});

userSchema.pre('find', function (next) {
  this.where({
    isDelete: {
      $ne: true,
    },
  });
  next();
});

userSchema.pre('findOne', function (next) {
  this.where({
    isDelete: {
      $ne: true,
    },
  });
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) return null;

  const isAuthenticated = await bcrypt.compare(password, user.password);

  return isAuthenticated ? user : null;
};

const UserSchema = mongoose.model('users', userSchema);

export default UserSchema;