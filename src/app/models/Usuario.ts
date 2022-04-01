import { PostagemModel } from "./PostagemModel"

export class Usuario {
    public id: number
    public nome: string
    public email: string
    public senha: string
    public foto: string
    public categoria: string
    public postagem: PostagemModel[]
}