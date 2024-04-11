import jwt from 'jsonwebtoken';
import User from '../models/users.js';

export const auth = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).json({
      message: 'please login',
    });
  }

  const decodedToken = await jwt.verify(token, 'Secret');
  console.log(decodedToken);
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(403).json({
      message: 'this user no longer exists',
    });
  }
  req.userId = user._id;
  next();
};
