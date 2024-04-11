import User from '../models/users.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      email: req.body.email,
    });
    if (existingUser) {
      return res.status(201).json({
        message: 'registered , please login',
      });
    }
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      email: req.body.email,
    });
    if (
      !existingUser ||
      !(await existingUser.verifyPassword(
        req.body.password,
        existingUser.password
      ))
    ) {
      return res.status(201).json({
        message: 'registered first before login ',
      });
    }
    let token = await jwt.sign({ id: existingUser._id }, 'Secret', {
      expiresIn: 24 * 60 * 60,
    });
    res.status(200).json({
      status: 'success',
      data: existingUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};
