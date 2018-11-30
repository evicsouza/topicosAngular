import { DBService } from './../servicos/db.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/entidades/usuario';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [DBService]
})
export class CadastroComponent implements OnInit {
  novoUsuario: Usuario;

  constructor(private database: DBService) {
    this.novoUsuario = new Usuario();
   }

  ngOnInit() { }

  salvar(){
    this.database.inserir('usuario', this.novoUsuario)
    .then(() => {
      alert('Usuário cadastrado com sucesso');
      this.novoUsuario = new Usuario();
    });
  }

}
