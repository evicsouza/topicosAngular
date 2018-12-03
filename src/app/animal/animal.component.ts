import { DBService } from './../servicos/db.service';
import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/entidades/animal';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css'],
  providers: [DBService]
})
export class AnimalComponent implements OnInit {
  animal: Animal;
  carregando: boolean;
  animais: Animal[];

  constructor(private dbService: DBService) { 
    this.animal = new Animal();
    this.carregarAnimais();
  }
  ngOnInit() {}

  private carregarAnimais() {
    this.carregando = true;
    this.dbService.listar<Animal>('animal')
    .then(animalDB => {
      this.animais = animalDB;

      this.carregando = false;
    });
  }
  salvar(){
      this.dbService.inserir("animal", this.animal)
      .then(() => {
        alert('Animal cadastrado com sucesso');
        this.animal = new Animal();
        this.carregarAnimais();
    });
  }  
  remover(uid: string) {
    this.dbService.remover('animal', uid)
      .then(() => {
        alert('Animal removido com sucesso');

        this.carregarAnimais();
      });
  }

  editar(usuario) {
    usuario.editando = true;
  }

  cancelEdit(usuario) {
    usuario.editando = false;
  }

  confirmEdit(animal) {
    this.dbService.atualizar('animal', animal.uid, { nome: animal.nome, idade: animal.idade })
      .then(() => {
        alert('Animal atualizado com sucesso');

        this.carregarAnimais();
      });
  }
}
