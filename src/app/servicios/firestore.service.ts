import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  getLists(userId: string): Observable<any[]> {
    return this.firestore.collection('lists', ref => ref.where('userId', '==', userId)).valueChanges();
  }

  getListItems(listId: string): Observable<any[]> {
    return this.firestore.collection('lists').doc(listId).collection('items').valueChanges();
  }

  addItemToList(listId: string, text: string, tag: string) {
    const item = {
      text,
      tag,
      status: 'creado',
      createdAt: new Date(),
      completedBy: null,
      completedAt: null
    };
    this.firestore.collection('lists').doc(listId).collection('items').add(item);
  }

  updateItemStatus(listId: string, itemId: string, status: string, userId: string) {
    const update = {
      status,
      completedBy: userId,
      completedAt: new Date()
    };
    this.firestore.collection('lists').doc(listId).collection('items').doc(itemId).update(update);
  }
}