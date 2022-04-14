import { Usuario } from './../models/Usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { PostagemModel } from '../models/PostagemModel';
import { Tema } from '../models/Tema';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: PostagemModel = new PostagemModel()
  listaPostagens: PostagemModel[]

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema:number

  user: Usuario = new Usuario()
  userAvaliacao: Usuario = new Usuario()
  idUser = environment.id
  foto = environment.foto
  nome = environment.nome
  tipo = environment.categoria
  avaliacao = environment.avaliacao
  listaUsuarios: Usuario[]

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  ngOnInit() {

    window.scroll(0, 0)
    if(environment.token == ''){
      this.router.navigate(['/entrar']);
    }

    this.authService.refreshToken()
    this.getAllTemas()
    this.getAllPostagens()
    this.findAllUsuarios()
    this.findByIdUsuario()
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) =>{
      this.tema = resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: PostagemModel[])=>{
      this.listaPostagens = resp
    })
  }

  findByIdUsuario(){
    this.authService.getByIdUsuario(this.idUser).subscribe((resp: Usuario) =>{
      this.user = resp
    })
  }

  findAllUsuarios(){
    this.authService.getAllUsuarios().subscribe((resp: Usuario[]) =>{
      this.listaUsuarios = resp
    })
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: PostagemModel) =>{
      this.postagem = resp
      alert("Postagem realizada com sucesso!")
      this.postagem = new PostagemModel()
      this.getAllPostagens()
    })
  }

  avaliacaoUsuario(event: any) {
    this.avaliacao = event.target.value
  }

  buscarUser(id: number){
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.userAvaliacao = resp
    })
  }

  atualizarAvaliacao(){
    this.userAvaliacao.avaliacao = this.avaliacao
    this.authService.mudarAvaliacao(this.userAvaliacao).subscribe((resp: Usuario) =>{
      this.userAvaliacao = resp
      alert("Avaliação alterada com sucesso!")
      this.findAllUsuarios()
    })
  }

}