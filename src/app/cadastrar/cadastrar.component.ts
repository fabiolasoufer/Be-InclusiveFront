import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  usuario: Usuario = new Usuario
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private route: Router

  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  confirmaSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUsuarios(event: any) {
    this.tipoUsuario = event.target.value
  }


  cadastrar() {
    this.usuario.categoria = this.tipoUsuario
    this.usuario.avaliacao = 'AZUL'

    if (this.usuario.senha != this.confirmarSenha) {
      alert('A senha está incorreta.')

    } else {
      console.log(this.usuario)
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.route.navigate(['/entrar'])
        alert('Usuário cadastrado com sucesso!')
      })
    }
  }
  

}
