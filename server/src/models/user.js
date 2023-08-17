import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const { BCRYPT_WORK_FACTOR } = process.env;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
      required: [true, 'User email is required!'],
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!!`,
      },
    },
    password: {
      type: String,
      minLength: [8, 'Mimume 8 characters are required!'],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', function () {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, Number(BCRYPT_WORK_FACTOR));
  }
});

userSchema.methods.matchesPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export const User = model('User', userSchema);
