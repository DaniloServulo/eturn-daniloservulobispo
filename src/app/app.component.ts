import { FormAddressComponent } from './form-address/form-address.component';
import { FormContactComponent } from './form-contact/form-contact.component';
import { FormModalComponent } from './form-modal/form-modal.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Eturn } from './models/eturn.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public dialog: MatDialog,
    public firestore: AngularFirestore,
    ) {
      this.readList();
    }
  title = 'eTurn';
  database: any;
  listUser: any;

  // Construindo a Tabela
  // tslint:disable-next-line: member-ordering
  displayedColumns: string[] = ['eMail', 'name', 'observation', 'contact', 'address', 'action'];
  listData: MatTableDataSource<any>;

  // Filtro de Pesquisa
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }


  // Chamando Modal - Tela Cadastro/Edição - Contato - Endereço
  openForm(data): void {
    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '520px',
      data
    });

    dialogRef.afterClosed();
  }

  openContact(data): void {
    const dialogRef = this.dialog.open(FormContactComponent, {
      width: '520px',
      data
    });

    dialogRef.afterClosed();
  }

  openAddress(data): void {
    const dialogRef = this.dialog.open(FormAddressComponent, {
      width: '720px',
      data
    });

    dialogRef.afterClosed();
  }


  // Read - Dados
  getOrderList(): AngularFirestoreCollection<Eturn> {
    return this.firestore.collection(`eTurn`);
  }

  readList() {
    this.getOrderList().valueChanges().subscribe((data) => {
      this.listUser = data;
      this.listData = new MatTableDataSource(data);
      // this.listData.paginator = this.paginator;

    });
  }

  // Deletando E-Turn
  getDelete(data) {
    return this.firestore.doc(`eTurn/${data.id}`).delete();
  }
}
