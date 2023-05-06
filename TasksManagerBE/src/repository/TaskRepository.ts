import { Task, User } from '../models'
import { TaskInput, TaskOutput } from '../utils/interfaces/TaskInterface'

export const create = async (payload: TaskInput, userId: number): Promise<TaskOutput> => {
    const task = await Task.create(payload)
    // associo l'utente che ha creato la nota
    await task.setUser(userId);
    
    return task;
}

export const getAll = async (id: number): Promise<TaskOutput[]> => {
    const tasks = await Task.findAll({
        order: [
            ["updatedAt", "DESC"],
        ],
        include: [
            {
                model: User,
                where: {
                    id : id
                }
            }
        ]
    })
    
    return tasks;
}

export const getById = async (id: number, userId: number): Promise<TaskOutput> => {
    const task = await Task.findOne({
        where: {
            id: id
        },
        include: [
            {
                model: User,
                where: {
                    id : userId
                }
            }
        ]
    })
    if (!task) {
        throw new Error('Task non trovato')
    }
    return task;
}

export const getAllByStatus = async (userId: number, status: boolean): Promise<TaskOutput[]> => {
    const tasks = await Task.findAll({
        order: [
            ["updatedAt", "DESC"],
        ],
        where: {
            done: status, 
        },
        include: [
            {
                model: User,
                where: {
                    id : userId
                }
            }
        ]
    })
    if (!tasks) {
        throw new Error('Task non trovato')
    }
    return tasks;
}

export const update = async (id: number, payload: Partial<TaskInput>): Promise<TaskOutput> => {
    const task = await Task.findByPk(id)
    console.log(payload)
    if (!task) {
        throw new Error('Task non trovato')
    }

    const updatedTask = await task.update(payload)
    
    return updatedTask;
}

export const deleteById = async (id: number, userId: number): Promise<TaskOutput> => {
    const task = await Task.findOne({
        where: {
            id: id
        },
        include: {
            model: User,
            where: {
                id : userId
            }
        }
    })
    
    if (!task) {
        throw new Error('Task non trovato')
    }
    
    await task.destroy()
    return task;
}

