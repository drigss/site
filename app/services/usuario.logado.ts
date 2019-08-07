import { Injectable } from '@angular/core';

export interface Config {
  id: number;
  nome: string;
  email: string;
  avatar: any;
}

@Injectable()
export class UsuarioLogado {
  DadosAcesso(): Config {
    return JSON.parse(localStorage.getItem('@Corretagem'));
  }
}
