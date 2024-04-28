import { User } from "./User";

export interface Conflict{
    involucrados: User[],
    solucion: string
}