import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../models/Usuario';
import { UsuarioLogin } from '../models/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }


  entrar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>('https://projetobeinclusive.herokuapp.com/usuarios/logar', usuarioLogin  )
}

cadastrar( usuario: Usuario): Observable<Usuario>{
  return this.http.post<Usuario>('https://projetobeinclusive.herokuapp.com/usuarios/cadastrar', usuario)
}
atualizarUsuario(usuario: Usuario): Observable<Usuario>{
  return this.http.put<Usuario>('https://projetobeinclusive.herokuapp.com/usuarios/atualizar', usuario, this.token)
}

mudarAvaliacao(usuario: Usuario): Observable<Usuario>{
  return this.http.put<Usuario>('https://projetobeinclusive.herokuapp.com/usuarios/atualizar', usuario, this.token)
}


getByIdUsuario(id: number): Observable<Usuario>{
  return this.http.get<Usuario>(`https://projetobeinclusive.herokuapp.com/usuarios/${id}`, this.token)
}

getAllUsuarios(): Observable<Usuario[]>{
  return this.http.get<Usuario[]>('https://projetobeinclusive.herokuapp.com/usuarios/all', this.token)
}

logado(){
  let ok: boolean = false
  if (environment.token != ''){
    ok = true
  }
  return ok
}

}

