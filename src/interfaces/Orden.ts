import { User } from "./User";

export interface Orden{
    creator: User,
    executioner: User,
    orden: string,
    objetivo: string,
    completado: boolean
}