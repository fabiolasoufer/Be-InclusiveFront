import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../models/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nome = environment.nome
  foto = environment.foto
  idUsuario = environment.id
  listaUsuarios: Usuario[]

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(){
  }
  sair(){
    this.router.navigate(['/entrar'])
    environment.token = ''
    environment.nome = ''
    environment.foto = ''
    environment.id = 0

}

getAllUsuarios(){
  this.authService.getAllUsuarios().subscribe((resp: Usuario[])=> {
    this.listaUsuarios = resp
  })
}

}
