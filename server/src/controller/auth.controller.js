import { BadRequest, logIn } from '../middlewares/index.js';
import { User } from '../models/user.js';

// Register
export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (![firstName, lastName, email, password].every(Boolean))
    throw new BadRequest('Please fill all inputs!');
  const checkUser = await User.findOne({ email: req?.body?.email });
  if (checkUser) {
    throw new BadRequest('Email Already in use');
  }

  const user = new User({
    firstName,
    lastName,
    email,
    password,
  });

  await user.save();

  res.status(201).json({
    success: true,
    message: 'Registration completed successfully!',
  });
};

//  LogIn
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (![email, password].every(Boolean))
    throw new BadRequest('Please fill all inputs!');

  const user = await User.findOne({ email });

  if (!user || !(await user.matchesPassword(password))) {
    throw new BadRequest('Incorrect email or password');
  }

  const token = await logIn({ _id: user?._id });

  return res.status(200).json({
    success: true,
    token,
    message: 'Login successfully',
    user,
  });
};
