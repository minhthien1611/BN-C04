import { Router } from 'express';
import AuthController from '../app/controllers/authController.js';
// import authenticated from '../app/middlewares/authenticated.js';
// import authorization from '../app/middlewares/authorization.js';

const authRoute = Router();

authRoute.get('/signup', AuthController.signUp);
authRoute.post('/login', AuthController.login);

export default authRoute;