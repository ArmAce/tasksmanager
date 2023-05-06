// Tipo User
export type UserType = {
    id: number,
    email: string,
    name: string,
    passwordHash: string,
}

// Tipo User 
export type UserPayloadType = {
    id: number,
    email: string,
    name: string;
    password: string,
}

// Tipo di dato passato quando viene fatta la modifica
export type UserEditPayloadType = Pick<UserPayloadType, 'password'| 'name'>

// Tipo user senza pass 
export type UserNoPassType = Pick<UserType, 'email'| 'name'|'id'>;

export type jwtPayload = UserNoPassType

export type LoginObj = {
    user: UserNoPassType,
    token: string
}