import { AngularFireDatabaseModule } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Eturn } from '../models/eturn.model';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class EturnService {

  constructor(
    public firestore: AngularFirestore,
  ) { }


  // Metodos Firebase
  create(eturn: Eturn) {

  }

  read(): AngularFirestoreCollection<Eturn> {
    return this.firestore.collection(`eTurn`);
  }

  update() {

  }

  delete() {

  }


}
