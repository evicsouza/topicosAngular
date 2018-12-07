import { DBService } from './../servicos/db.service';
import { Component, OnInit } from '@angular/core';
import { Livro } from 'src/entidades/livro';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css'],
  providers: [DBService]
})
export class LivroComponent implements OnInit {
  livro: Livro;
  carregando: boolean;
  livros: Livro[];

  constructor(private dbService: DBService) { 
    this.livro = new Livro();
    this.carregarLivros();
  }
  ngOnInit() {}

  private carregarLivros() {
    this.carregando = true;
    this.dbService.listar<Livro>('livro')
    .then(livroDB => {
      this.livros = livroDB;

      this.carregando = false;
    });
  }
  salvar(){
      this.dbService.inserir("livro", this.livro)
      .then(() => {
        alert('Livro cadastrado com sucesso');
        this.livro = new Livro();
        this.carregarLivros();
    });
  }  
  remover(uid: string) {
    this.dbService.remover('livro', uid)
      .then(() => {
        alert('Livro removido com sucesso');

        this.carregarLivros();
      });
  }

  editar(usuario) {
    usuario.editando = true;
  }

  cancelEdit(usuario) {
    usuario.editando = false;
  }

  confirmEdit(livro) {
    this.dbService.atualizar('livro', livro.uid, { nome: livro.nome, idade: livro.idade })
      .then(() => {
        alert('Livro atualizado com sucesso');

        this.carregarLivros();
      });
  }
}
