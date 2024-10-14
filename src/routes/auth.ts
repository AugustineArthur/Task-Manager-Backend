import express from 'express';
   import { signup, login } from '../controllers/authController';

   const router = express.Router();

   router.post('/signup', signup);
   router.post('/login', login);

   export default router;

// const router = express.Router();

// const authController = require('../controllers/authController');

// router.route('/loginin').post(authController.login);
// router.route('/signup').post(authController.signup);

// module.exports = router;