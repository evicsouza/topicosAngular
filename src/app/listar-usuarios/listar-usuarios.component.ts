import { Usuario } from 'src/entidades/usuario';
import { Component, OnInit } from '@angular/core';
import { DBService } from '../servicos/db.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css'],
  providers: [DBService]
})
export class ListarUsuariosComponent implements OnInit {
  carregando: boolean;
  usuarios: Usuario[];


  constructor(private database: DBService) {
  }
  
  ngOnInit() {
    this.carregarUsuarios();

  }
  private carregarUsuarios() {
    this.carregando = true;

    this.database.listar<Usuario>('usuarios')
    .then(usuariosDB => {
      this.usuarios = usuariosDB;

      this.carregando = false;
    });
  }
  remover(uid: string) {
    this.database.remover('usuarios', uid)
      .then(() => {
        alert('usuário removido com sucesso');

        this.carregarUsuarios();
      });
  }

  editar(usuario) {
    usuario.editando = true;
  }

  cancelEdit(usuario) {
    usuario.editando = false;
  }

  confirmEdit(usuario) {
    this.database.atualizar('usuarios', usuario.uid, { nome: usuario.nome, email: usuario.email })
      .then(() => {
        alert('usuário atualizado com sucesso');

        this.carregarUsuarios();
      });
  }
}