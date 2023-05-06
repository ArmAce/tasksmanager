import { Router } from 'express'
import UsersRouter from './UsersRoutes'
import TasksRouter from './TasksRoutes'

const router = Router()

router.use('/users', UsersRouter)
router.use('/tasks', TasksRouter)

export default router