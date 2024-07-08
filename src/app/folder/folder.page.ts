import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../servicios/firestore.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  public lists: any[] = [];
  public selectedListId: string | null = null;
  public items: any[] = [];
  public newItemText: string = '';
  public newItemTag: string = '';

  constructor(private activatedRoute: ActivatedRoute, private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.loadLists();
  }

  loadLists() {
    const userId = 'currentUserId';
    this.firestoreService.getLists(userId).subscribe(lists => {
      this.lists = lists;
    });
  }

  selectList(listId: string) {
    this.selectedListId = listId;
    this.loadItems(listId);
  }

  loadItems(listId: string) {
    this.firestoreService.getListItems(listId).subscribe(items => {
      this.items = items;
    });
  }

  addItem() {
    if (this.selectedListId && this.newItemText && this.newItemTag) {
      this.firestoreService.addItemToList(this.selectedListId, this.newItemText, this.newItemTag);
      this.newItemText = '';
      this.newItemTag = '';
    }
  }

  updateItemStatus(itemId: string, status: string) {
    if (this.selectedListId) {
      const userId = 'currentUserId';
      this.firestoreService.updateItemStatus(this.selectedListId, itemId, status, userId);
    }
  }
}
