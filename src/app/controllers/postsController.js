import UserSchema from '../models/userSchema.js';
import config from '../../config.js';
import HttpStatusCode from '../constants/httpStatusCode.js';
import {
  BadRequest,
  PaginationResponse,
  SuccessResponse,
} from '../apiResponses/apiResponse.js';


class PostsController {

    async getPosts() {
        const posts = await UserSchema.find();
        return res.status(HttpStatusCode.Ok).send(new SuccessResponse(posts));
    }

    async deletePosts(req, res, next) {
        const { id } = req.params;
    
        const posts = await UserSchema.findOne({
          _id: id,
        });
    
        if (!posts) {
          return res
            .status(HttpStatusCode.BadRequest)
            .send(new BadRequest('Posts does not exist in Database'));
        }
    
        const updateResult = await UserSchema.updateOne(
          {
            _id: id,
          },
          {
            $set: {
              isDelete: true,
              deletedDate: new Date(),
            },
          }
        );
    
        if (updateResult.modifiedCount === 0) {
          return res
            .status(HttpStatusCode.BadRequest)
            .send(new BadRequest('Can not delete Posts with id: ' + id));
        }
    
        return res.status(HttpStatusCode.Ok).send(new SuccessResponse());
      }

      async createPosts(req, res, next) {
        try {
          const { title, content } = req.body;

          const posts = new UserSchema({
            title,
            content,
          });
    
          return res.status(HttpStatusCode.Ok).send(new SuccessResponse(posts));
        } catch (error) {
          next(error);
        }
      }
}


export default new PostsController();