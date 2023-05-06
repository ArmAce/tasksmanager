import { Router } from 'express'
import * as controller from '../controllers/UsersController'

const UsersRouter = Router();

UsersRouter.get('/checkUser', controller.CheckUser)
UsersRouter.get('/:id', controller.GetUserById)
UsersRouter.post('/create', controller.CreateUser)
UsersRouter.post('/login', controller.LoginUser)


export default UsersRouter