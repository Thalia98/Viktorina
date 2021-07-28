import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {


  constructor() {
  }

  order(collection, desc) {
    let collectionResult = [];

    if (desc) {
      collectionResult = collection.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
    } else {
      collectionResult = collection.sort((a, b) => (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0));
    }

    return collectionResult;
  }

  search(collection, searchedWord) {
    let collectionResult = [];

    collection.forEach(item => {
      if (item.title.toLowerCase().includes(searchedWord.toLowerCase())) {
        collectionResult.push(item);
      }
    });


    return collectionResult;
  }
}
