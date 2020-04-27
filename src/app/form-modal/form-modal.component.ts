import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Eturn } from '../models/eturn.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { eTurnCep } from '../services/eTurnCep.service';
import { EturnAddress } from '../models/eturnAddress.model';
@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {

  form: FormGroup;
  email: any;
  id: any;
  cep: any;
  verificandoEmail: any;
  verificando: AngularFirestoreCollection<unknown>;
  msgEmail: any;
  verificandoPhone: any;
  msgPhone: string;

  constructor(
    public dialogRef: MatDialogRef<FormModalComponent>,
    public firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public eturnCepService: eTurnCep,
  ) {

    // Formulario
    this.form = this.formBuilder.group({
      id: [null, [Validators.required]],
      name: ['', [Validators.required]],
      eMail: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      observation: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      numeroLocal: ['', [Validators.required]],
    });

    this.form.controls.name.setValue(data.name);
    this.form.controls.eMail.setValue(data.eMail);
    this.form.controls.phone.setValue(data.phone);
    this.form.controls.observation.setValue(data.observation);
    this.id = data.id;
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

  // Validando E-Mail
  validateEmail() {
    this.verificandoEmail = this.form.controls.eMail.value;

    this.verificando = this.firestore.collection(`eTurn`, ref => ref.where('eMail', '==', this.verificandoEmail));
    this.verificando.valueChanges().subscribe((data) => {
      console.log(data);
      if (data.length > 0){
        this.msgEmail = 'E-Mail existente';
      }
      else{
        this.msgEmail = '';
      }

    });
  }
  validatePhone() {
    this.verificandoPhone = this.form.controls.phone.value;

    this.verificando = this.firestore.collection(`eTurnPhone`, ref => ref.where('phone', '==', this.verificandoPhone));
    this.verificando.valueChanges().subscribe((data) => {
      console.log(data);
      if (data.length > 0) {
        this.msgPhone = 'Telefone Existente';
      }
      else{
        this.msgPhone = '';
      }
    });
  }
  // Criando ou Alterando
  createUpdate() {
    if (this.data.id == null) {
      const id = this.firestore.createId();
      const idPhone = this.firestore.createId();
      const idAddress = this.firestore.createId();

      // Form - List eTurn
      const eTurn = {
        id,
        name: this.form.controls.name.value,
        eMail: this.form.controls.eMail.value,
        observation: this.form.controls.observation.value,
        };

      // Form - List eTurnTelefone
      const eTurnPhone = {
        idPhone,
        phone: this.form.controls.phone.value,
        fkId: eTurn.id,
        };


       // Form - List eTurnEndereco
      const eTurnAddress = {
        id: idAddress,
        cep: this.form.controls.cep.value,
        logradouro: this.form.controls.logradouro.value,
        bairro: this.form.controls.bairro.value,
        estado: this.form.controls.estado.value,
        cidade: this.form.controls.cidade.value,
        numeroLocal: this.form.controls.numeroLocal.value,
        fkId: eTurn.id,
        };


      // Envios
      this.firestore.doc(`eTurn/${id}`).set(eTurn);
      this.firestore.doc(`eTurnTelefone/${id}`).set(eTurnPhone);
      this.firestore.doc(`eTurnEndereco/${id}`).set(eTurnAddress);
      this.dialogRef.close();
    } else {
      const eTurn = {
        name: this.form.controls.name.value,
        eMail: this.form.controls.eMail.value,
        observation: this.form.controls.observation.value,
      };
      this.firestore.doc(`eTurn/${this.id}`).update(eTurn);
      this.dialogRef.close();
    }

  }

  // Fechando Modal
  fechar(): void {
    this.dialogRef.close();
  }

}
