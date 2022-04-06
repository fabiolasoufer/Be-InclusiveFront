import { Tema } from "./Tema"
import { Usuario } from "./Usuario"

export class PostagemModel {
    public id: number
    public titulo: string
    public descricao: string
    public date: Date
    public usuario: Usuario
    public tema: Tema
}
