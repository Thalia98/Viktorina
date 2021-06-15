import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/globalValues';

@Component({
  selector: 'app-list-questionnaires',
  templateUrl: './list-questionnaires.component.html',
  styleUrls: ['./list-questionnaires.component.scss'],
})
export class ListQuestionnairesComponent implements OnInit {
lista = [
  {
    descripcion: 'dddd',
    titulo: 'titulo',
    fecha: '26/05/32'
  },
  {
    descripcion: 'dddd',
    titulo: 'titulo',
    fecha: '26/05/32'
  },
  {
    descripcion: 'dddd',
    titulo: 'titulo',
    fecha: '26/05/32'
  },
  {
    descripcion: 'dddd',
    titulo: 'titulo',
    fecha: '26/05/32'
  },
  {
    descripcion: 'dddd',
    titulo: 'titulo',
    fecha: '26/05/32'
  },
]
  constructor(
    public menu: Menu
  ) { }

  ngOnInit() {
  }

}
