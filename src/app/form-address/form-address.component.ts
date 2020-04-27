import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { eTurnCep } from '../services/eTurnCep.service';

@Component({
  selector: 'app-form-address',
  templateUrl: './form-address.component.html',
  styleUrls: ['./form-address.component.css']
})
export class FormAddressComponent implements OnInit {

  form: FormGroup;
  displayedColumns: string[] = ['cep', 'logradouro', 'bairro', 'estado', 'cidade', 'numeroLocal', 'action'];
  listData: MatTableDataSource<any>;
  cep: any;

  constructor(
    public firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    public eturnCepService: eTurnCep,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    // Listagem
    this.readList();

    // Formulario
    this.form = this.formBuilder.group({
      id: [null, [Validators.required]],
      cep: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      numeroLocal: ['', [Validators.required]],
    });

   }


  ngOnInit() {
  }
  // Buscando CEP
  buscarCep() {
    this.cep = this.form.controls.cep.value;
    this.eturnCepService.getCep(this.cep).subscribe((data) => {
      this.form.controls.logradouro.setValue(data.logradouro);
      this.form.controls.bairro.setValue(data.bairro);
      this.form.controls.cidade.setValue(data.cidade);
      this.form.controls.estado.setValue(data.estado);
    });
  }

  // Read - Dados - Chamada
  getOrderList(): AngularFirestoreCollection {
    return this.firestore.collection(`eTurnEndereco`, ref => ref.where('fkId', '==', this.data));
  }

  readList() {
    this.getOrderList().valueChanges().subscribe((data) => {
      this.listData = new MatTableDataSource(data);
      // this.listData.paginator = this.paginator;

    });
  }

  // Atribuindo Endereço
  create() {
      const id = this.firestore.createId();
     // Form - List eTurnEndereco
      const eTurnAddress = {
      id,
      cep: this.form.controls.cep.value,
      logradouro: this.form.controls.logradouro.value,
      bairro: this.form.controls.bairro.value,
      estado: this.form.controls.estado.value,
      cidade: this.form.controls.cidade.value,
      numeroLocal: this.form.controls.numeroLocal.value,
      fkId: this.data,
      };

      this.firestore.doc(`eTurnEndereco/${id}`).set(eTurnAddress);
  }
  // Deletando Endereço
  getDelete(element) {
    return this.firestore.doc(`eTurnEndereco/${element}`).delete();
  }

}
