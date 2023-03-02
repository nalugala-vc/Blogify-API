import express from 'express';
import { getAllUsers, signup , login } from '../controllers/user.js';

const router = express.Router();
/*USER ROUTES*/

router.get('/', getAllUsers);
router.post('/signup',signup);
router.post('/login',login);

export default router;