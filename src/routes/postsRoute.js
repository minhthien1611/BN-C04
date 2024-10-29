import { Router } from 'express';
import PostsController from '../app/controllers/postsController.js';
const userRoute = Router();

// Rest api

userRoute.post(
    '/posts/fetch',
    PostsController.getPosts
);

userRoute.post(
  '/posts',
  PostsController.createPosts
);

userRoute.delete(
  '/posts/:id',
  PostsController.deletePosts
);

userRoute.put('/users', AuthController.createUser);

export default userRoute;
