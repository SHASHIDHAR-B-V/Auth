import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, ' required name field'],
    },
    email: {
      type: String,
      required: [true, 'required email'],
    },
    password: {
      type: String,
      required: [true, 'requires Password'],
      minLength: [8, 'not less than 8 characters'],
    },
    confirmPassword: {
      type: String,
      required: [true, 'confirm password  is required'],
      validate: function (value) {
        return this.password === value;
      },
      message: 'password and confirm password do not match',
    },
  },
  { timeStamps: true }
);

userSchema.pre('save', async function (next) {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.verifyPassword = async function (pwd, pwdDb) {
  return await bcrypt.compare(pwd, pwdDb);
};

const User = model('user', userSchema);

export default User;
