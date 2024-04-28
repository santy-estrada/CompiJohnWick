import { User } from "./User";

export interface Mision{
    ejecutor: User,
    completado: boolean,
    descripcion: string,
}