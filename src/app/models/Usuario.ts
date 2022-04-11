import { PostagemModel } from "./PostagemModel"
import { Tema } from "./Tema"

export class Usuario {
    public id: number
    public nome: string
    public email: string
    public senha: string
    public foto: string
    public categoria: string
    public avaliacao: string
    public postagem: PostagemModel[]
    public tema: Tema[]
}