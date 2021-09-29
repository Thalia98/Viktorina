import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  collection: any[] = [];
  collectionSearch: any[] = [];

  loading: boolean = false;
  isFilter: boolean = false;

  levelCollection: any[] = [
    { name: 'Principiante', isSelected: false },
    { name: 'Intermedio', isSelected: false },
    { name: 'Difícil', isSelected: false }
  ];
  categoryCollection: any[] = [
    { name: 'Otro', isSelected: false },
    { name: 'Informática', isSelected: false },
    { name: 'Deporte', isSelected: false },
    { name: 'Historia', isSelected: false },
    { name: 'Arte', isSelected: false },
    { name: 'Ciencia', isSelected: false },
    { name: 'Geografía', isSelected: false },
    { name: 'Cultura general', isSelected: false }
  ];


  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.collectionSearch = this.collection;

    if (localStorage.getItem('categoryCollection')) {
      this.levelCollection = JSON.parse(localStorage.getItem('levelCollection'));
      this.categoryCollection = JSON.parse(localStorage.getItem('categoryCollection'));
      this.filter();
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  getLengthOfCategory(category) {
    let collectionCategory = this.collection.filter(questionnaire => questionnaire.category === category);
    return collectionCategory.length;
  }

  getLengthOfLevel(level) {
    let collectionLevel = this.collection.filter(questionnaire => questionnaire.level === level);
    return collectionLevel.length;
  }

  selectedLevel(index) {
    this.loading = true;
    this.levelCollection[index].isSelected = !this.levelCollection[index].isSelected;
    this.filter();
  }

  selectedCategory(index) {
    this.loading = true;
    this.categoryCollection[index].isSelected = !this.categoryCollection[index].isSelected;
    this.filter();
  }


  filter() {
    let allFalse = true;
    this.collectionSearch = [];
    let collectionCategorySelected = this.categoryCollection.filter(questionnaire => questionnaire.isSelected).length > 0 ? this.categoryCollection.filter(questionnaire => questionnaire.isSelected) : this.categoryCollection;
    let collectionLevelSelected = this.levelCollection.filter(questionnaire => questionnaire.isSelected).length > 0 ? this.levelCollection.filter(questionnaire => questionnaire.isSelected) : this.levelCollection ;

    collectionCategorySelected.forEach(category => {
      collectionLevelSelected.forEach(level => {
        allFalse = false;
        this.isFilter = true;
        let collectionFilter = this.collection.filter(questionnaire => questionnaire.category === category.name && questionnaire.level === level.name);
        collectionFilter.forEach(questionnaireFilter => this.collectionSearch.push(questionnaireFilter));
      });
    });

    if(this.categoryCollection.length === collectionCategorySelected.length && this.levelCollection.length === collectionLevelSelected.length) {
      this.isFilter = false;
    }

    if (allFalse) {
      this.collectionSearch = this.collection;
    }

    this.removeDuplicate();
  }

  removeDuplicate() {
    this.collectionSearch = this.collectionSearch.filter((questionnaire, index, self) =>
      index === self.findIndex((q) => (
        q.level === questionnaire.level && q.category === questionnaire.category && q.createDate === questionnaire.createDate
      )));

    setTimeout(() => {
      this.loading = false;
    }, 100);
  }

  showResults() {
    localStorage.setItem('categoryCollection', JSON.stringify(this.categoryCollection));
    localStorage.setItem('levelCollection', JSON.stringify(this.levelCollection));

    this.modalCtrl.dismiss({ collection: this.collectionSearch, isFilter: this.isFilter });
  }

  removeFilters() {
    this.loading = true;
    this.levelCollection.forEach(level => level.isSelected = false);
    this.categoryCollection.forEach(category => category.isSelected = false);
    this.isFilter = false;

    localStorage.removeItem('categoryCollection');
    localStorage.removeItem('levelCollection');
    this.collectionSearch = this.collection;

    setTimeout(() => {
      this.loading = false;
    }, 100);
  }

}
