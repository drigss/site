import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-corretora',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cadastro-corretora.component.html',
  styleUrls: ['./cadastro-corretora.component.scss']
})
export class CadastroCorretoraComponent implements OnInit {
  hide = true;
  Form: FormGroup;
  dados2: any = {};

  constructor(
    private firestore: AngularFirestore,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CadastroCorretoraComponent>,
    @Inject(MAT_DIALOG_DATA) public dados: any,
    protected http: HttpClient
  ) {
    this.Form = fb.group({
      nome: [null, Validators.required],
      cnpj: [null, Validators.required],
      banco: [null, Validators.required],
      agencia: [null, Validators.required],
      conta: [null, Validators.required]
    });
  }

  ngOnInit() {
    if (this.dados.id === 0) this.dados2 = {};
    else this.dados2 = this.dados;
  }

  Salvar(): void {
    if (this.Form.valid) {
      if (this.dados.id === 0) {
        this.firestore
          .collection(`corretoras`)
          .add(this.dados2)
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
          .doc(`corretoras/${this.dados.id}`)
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
