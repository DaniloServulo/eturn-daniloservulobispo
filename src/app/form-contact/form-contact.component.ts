import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.css']
})
export class FormContactComponent implements OnInit {

  form: FormGroup;
  displayedColumns: string[] = ['phone', 'action'];
  listData: MatTableDataSource<any>;

  constructor(
    public dialogRef: MatDialogRef<FormContactComponent>,
    private formBuilder: FormBuilder,
    public firestore: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    // Formulario
    this.form = this.formBuilder.group({
      id: [null, [Validators.required]],
      phone: ['', [Validators.required]],
    });
   }

  ngOnInit() {
    this.readList();
  }

  // Read - Dados - Chamada
  getOrderList(): AngularFirestoreCollection {
    return this.firestore.collection(`eTurnTelefone`, ref => ref.where('fkId', '==', this.data));
  }

  readList() {
    this.getOrderList().valueChanges().subscribe((data) => {
      this.listData = new MatTableDataSource(data);
      // this.listData.paginator = this.paginator;

    });
  }

  // Atribuindo Telefone Usuario
  create() {
    const id = this.firestore.createId();
     // Form - List eTurn
    const eTurn = {
      id,
      phone: this.form.controls.phone.value,
      fkId: this.data,
      };
    this.firestore.doc(`eTurnTelefone/${id}`).set(eTurn);
  }

  // Deletando Telefone
  getDelete(element) {
    return this.firestore.doc(`eTurnTelefone/${element}`).delete();
  }

  // Fechando Modal
  fechar(): void {
    this.dialogRef.close();
  }
}
