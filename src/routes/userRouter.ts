import express from 'express'
import UserController from '../controller/UserController'
import FriendshipController from '../controller/FriendshipController'
import FeedController from '../controller/FeedController'
import RatingController from '../controller/RatingController'
import CommentController from '../controller/CommentController'

export const userRouter = express.Router()

const userController = new UserController()

const friendShipController = new FriendshipController()

const feedController = new FeedController()

const ratingController = new RatingController()

const commentController = new CommentController()

userRouter.post('/signup', userController.signup)
userRouter.post('/login', userController.login)
userRouter.post('/makefriendship/:id', friendShipController.makeFriendship)
userRouter.delete('/undofriendship/:id', friendShipController.undoFriendship)
userRouter.post('/createpost', feedController.createPost)
userRouter.get('/feed', feedController.getFeed)
userRouter.get('/filter', feedController.getFeedByType)
userRouter.post('/like', ratingController.likePost)
userRouter.delete('/unlike', ratingController.unlikePost)
userRouter.post('/comment', commentController.createComment)