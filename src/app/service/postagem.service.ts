import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { PostagemModel } from '../models/PostagemModel';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

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

  getAllPostagens(): Observable<PostagemModel[]>{
    return this.http.get<PostagemModel[]>('https://projetobeinclusive.herokuapp.com/postagens', this.token)
  }

  getByIdPostagem(id:number): Observable<PostagemModel>{
    return this.http.get<PostagemModel>(`https://projetobeinclusive.herokuapp.com/postagens/${id}`, this.token)
  }

  postPostagem(postagem: PostagemModel): Observable<PostagemModel>{
    return this.http.post<PostagemModel>('https://projetobeinclusive.herokuapp.com/postagens', postagem, this.token)
  }

  putPostagem(postagem: PostagemModel): Observable<PostagemModel>{
    return this.http.put<PostagemModel>('https://projetobeinclusive.herokuapp.com/postagens', postagem, this.token)
  }

  deletePostagem(id:number){
    return this.http.delete<PostagemModel>(`https://projetobeinclusive.herokuapp.com/postagens/${id}`, this.token)
  }
}

