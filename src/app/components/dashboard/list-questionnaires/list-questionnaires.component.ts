import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-questionnaires',
  templateUrl: './list-questionnaires.component.html',
  styleUrls: ['./list-questionnaires.component.scss'],
})
export class ListQuestionnairesComponent implements OnInit {
  isMyQuestionnaires: boolean;

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
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.isMyQuestionnaires === 'false') {
        this.isMyQuestionnaires = false;
      } else {
        this.isMyQuestionnaires = true;
      }
    });
  }

}
