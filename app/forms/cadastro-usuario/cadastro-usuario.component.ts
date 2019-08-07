import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-usuario',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {
  hide = true;
  Form: FormGroup;
  dados2: any = {};

  constructor(
    private firestore: AngularFirestore,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CadastroUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public dados: any,
    private EncrDecr: EncrDecrService,
    protected http: HttpClient
  ) {
    this.Form = fb.group(
      {
        nome: [null, Validators.required],
        email: [null, Validators.required],
        senha: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
        senha2: [null, Validators.required]
      },
      {
        validator: passwordMatchValidator
      }
    );

    function passwordMatchValidator(g: FormGroup) {
      return g.get('senha').value === g.get('senha2').value ? null : g.get('senha2').setErrors({ mismatch: true });
    }
  }

  ngOnInit() {
    if (this.dados.id === 0) this.dados2 = {};
    else {
      this.dados2 = this.dados;
      this.dados2.senha = this.EncrDecr.get('ecc0f25e8026ace98dd236ece0fec41b', this.dados.senha);
      this.dados2.senha2 = this.dados2.senha;
    }
  }

  Salvar(): void {
    if (this.Form.valid) {
      this.dados2.senha = this.EncrDecr.set('ecc0f25e8026ace98dd236ece0fec41b', this.dados2.senha);
      this.dados2.senha2 = this.dados2.senha;

      if (this.dados.id === 0) {
        this.firestore
          .collection(`usuarios`)
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
          .doc(`usuarios/${this.dados.id}`)
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
