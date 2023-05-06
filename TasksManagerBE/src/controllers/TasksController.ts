import { Request, Response } from 'express'
import * as repo from '../repository/TaskRepository'
import { getUser } from '../utils/functions/users';
import { TaskInterface } from '../utils/interfaces/TaskInterface';
import { setError } from '../utils/functions/errors';

export const CreateTask = async (req: Request, res: Response) => {
    const {title, content, tagsList, project, ...rest} = req.body
    
    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare l\'operazione'))
    }

    const payload = {
        title,
        ...(content && { content }),
        done: false
    }
    console.log(payload)
    
    try {
        const task : TaskInterface = await repo.create(payload, user.id)
        return res.status(200).send(task);
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const GetAllTasks = async (req: Request, res: Response) => {
    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare l\'operazione'))
    }
    try {
        const tasks : TaskInterface[] = await repo.getAll(user.id);
        if(!tasks) {
            throw new Error('Nessuna nota trovata')
        }
        return res.status(200).send(tasks);
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const GetTaskById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare l\'operazione'))
    }
    try {
        const task: TaskInterface = await repo.getById(id, user!.id);
        if(!task) {
            throw new Error('Nessuna nota trovata')
        }
        return res.status(200).send(task);
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const GetTaskByStatus = async (req: Request, res: Response) => {
    const { done } = req.body;
    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare l\'operazione'))
    }
    try {
        const tasks: TaskInterface[] = await repo.getAllByStatus(user!.id, done);
        if(!tasks) {
            throw new Error('Nessuna nota trovata')
        }
        return res.status(200).send(tasks);
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const UpdateTask = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const {title, content, done, tagsList, project, ...rest} = req.body

    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare l\'operazione'))
    }
    
    const payload = {
        id: id,
        title,
        ...(done && { done }),
        ...(content && { content }),
    }

    try {
        const task : TaskInterface = await repo.update(id, payload)
        if(!task) {
            throw new Error('Nessuna nota trovata')
        }
        return res.status(200).send(task)
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const DeleteTask = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare l\'operazione'))
    }
    try {
        const task = await repo.deleteById(id, user.id)
        if(!task) {
            throw new Error('Nessuna nota trovata')
        }
        return res.status(200).send(task)
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}



