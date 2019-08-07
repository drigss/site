import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import * as firebase from 'firebase';

@Component({
  selector: 'app-cadastro-nota',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cadastro-nota.component.html',
  styleUrls: ['./cadastro-nota.component.scss']
})
export class CadastroNotaComponent implements OnInit {
  hide = true;
  Form: FormGroup;
  dados2: any = {};
  corretoras: any = [];

  constructor(
    private firestore: AngularFirestore,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CadastroNotaComponent>,
    @Inject(MAT_DIALOG_DATA) public dados: any,
    protected http: HttpClient
  ) {
    this.Form = fb.group({
      corretora: [null, Validators.required],
      numero_nota: [null, Validators.required],
      data_nota: [null, Validators.required],
      total_compras: [null, Validators.required],
      total_vendas: [null, Validators.required],
      liquidacao: [null, Validators.required],
      registro: [null, Validators.required],
      emolumento: [null, Validators.required],
      ir: [null, Validators.required]
    });
    this.CarregarCorretoras();
  }

  ngOnInit() {
    if (this.dados.id === 0) this.dados2 = {};
    else this.dados2 = { data: moment(this.dados.data_nota.seconds * 1000).format('YYYY-MM-DD'), ...this.dados };
  }

  CarregarCorretoras(): void {
    this.firestore
      .collection(`corretoras`)
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))))
      .subscribe(data => {
        this.corretoras = data;
      });
  }

  Salvar(): void {
    if (this.Form.valid) {
      const { corretora, numero_nota, data, total_compras, total_vendas, liquidacao, registro, emolumento, ir } = this.dados2;
      if (this.dados.id === 0) {
        this.firestore
          .collection(`notas`)
          .add({
            corretora,
            corretora_ref: this.firestore.doc('corretoras/' + corretora).ref,
            numero_nota,
            data_nota: firebase.firestore.Timestamp.fromDate(new Date(moment(data).format('MM/DD/YYYY'))),
            total_compras,
            total_vendas,
            liquidacao,
            registro,
            emolumento,
            ir,
            created_time: firebase.firestore.FieldValue.serverTimestamp()
          })
          .then(() => {
            swal
              .fire({
                title: 'Atenção!',
                type: 'success',
                text: 'Registro cadastrado com sucesso!'
              })
              .then(result => {
                if (result.value) {
                  this.dialogRef.close();
                }
              });
          })
          .catch(() => {
            swal.fire({
              title: 'Atenção!',
              type: 'warning',
              text: 'Ops... algo de errado aconteceu, tente novamente ou entre em contato com nosso suporte!'
            });
          });
      } else {
        this.firestore
          .doc(`notas/${this.dados.id}`)
          .update(this.dados2)
          .then(() => {
            swal
              .fire({
                title: 'Atenção!',
                type: 'success',
                text: 'Registro alterado com sucesso!'
              })
              .then(result => {
                if (result.value) {
                  this.dialogRef.close();
                }
              });
          })
          .catch(() => {
            swal.fire({
              title: 'Atenção!',
              type: 'warning',
              text: 'Ops... algo de errado aconteceu, tente novamente ou entre em contato com nosso suporte!'
            });
          });
      }
    }
  }
}
