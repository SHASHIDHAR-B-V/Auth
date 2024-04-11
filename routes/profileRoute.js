import { Router } from 'express';
import { auth } from '../middleware/authMiddleware.js';

import User from '../models/users.js';

let profileRouter = Router();

profileRouter.get('/home', auth, async (req, res) => {
  const user = await User.findById(req.userId);
  res.send(`this is home welcome ${user.name}`);
});

export default profileRouter;
