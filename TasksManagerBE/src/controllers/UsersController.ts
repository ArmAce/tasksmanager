import { Request, Response } from 'express'
import * as repo from '../repository/UserRepository'
import { UserInterface } from '../utils/interfaces/UserInterface';
import { compareSync, hashSync } from 'bcryptjs';
import { UserEditPayloadType, UserPayloadType } from '../utils/types/UserTypes';
import { clearUser, generateAccessToken, getUser, parseToken } from '../utils/functions/users';
import { setError } from '../utils/functions/errors';


export const CreateUser = async (req: Request, res: Response) => {
    const payload: UserPayloadType = req.body;
   
    try {
        const {password, ...rest} = payload;
        const user : UserInterface = await repo.create({
            ...rest,
            passwordHash: hashSync(payload.password, 10)
        })
        return res.status(200).send(user);
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const GetUserById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const user : UserInterface = await repo.getById(id);
        if(!user) {
            throw new Error('Nessun user trovato')
        }
        return res.status(200).send(user);
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const LoginUser = async (req: Request, res: Response) =>  {
    try {
        const {email, password} = req.body;
        
        const user = await repo.getByEmail(email);

        if(!user||!compareSync(password,user.passwordHash)) {
            return res.status(403).send(setError('Credenziali non valide'))
        }
        const access = generateAccessToken(user)
        const clearedUser = clearUser(user)
        
        const tokensObj = {
            user: clearedUser,
            token: access
        }

        return res.status(200).send({ user: tokensObj.user, token: tokensObj.token })
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const CheckUser = async (req: Request, res: Response) => {
    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato.'))
    } 
    return res.status(200).send(user)
}


