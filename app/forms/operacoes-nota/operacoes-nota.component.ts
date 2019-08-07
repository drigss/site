import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NotasOperacoes } from 'src/app/models/notas_operacoes';
import * as firebase from 'firebase';

@Component({
  selector: 'app-operacoes-nota',
  templateUrl: './operacoes-nota.component.html',
  styleUrls: ['./operacoes-nota.component.scss']
})
export class OperacoesNotaComponent implements OnInit {
  hide = true;
  Form: FormGroup;
  dados2: any = {};
  Carregando: Boolean = false;

  public operacoes: Array<Object> = [{ id: 'C', descricao: 'Compra' }, { id: 'V', descricao: 'Venda' }];
  public papeis: Array<Object> = [{ id: 1, descricao: 'Ação' }, { id: 2, descricao: 'ETF' }];
  public displayedColumns = ['operacao', 'ticker', 'papel', 'quantidade', 'preco_unitario', 'preco_total', 'liquido', 'operacoes'];
  public dataSource = [];

  constructor(
    private firestore: AngularFirestore,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<OperacoesNotaComponent>,
    @Inject(MAT_DIALOG_DATA) public dados: any,
    protected http: HttpClient
  ) {
    this.Form = fb.group({
      operacao: [null, Validators.required],
      ticker: [null, Validators.required],
      papel: [null, Validators.required],
      quantidade: [null, Validators.required],
      preco_unitario: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.CarregarOperacoes();
  }

  Salvar(): void {
    if (this.Form.valid) {
      if (this.dados2.id === undefined) {
        this.firestore
          .collection(`notas_operacoes`)
          .add({
            nota: this.dados.id,
            preco_total: (this.dados2.quantidade * this.dados2.preco_unitario).toFixed(2),
            created_time: firebase.firestore.FieldValue.serverTimestamp(),
            ...this.dados2
          })
          .then(() => {
            this.ResetForm();
            this.CarregarOperacoes();
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
          .doc(`notas_operacoes/${this.dados2.id}`)
          .update({ nota: this.dados.id, ...this.dados2 })
          .then(() => {})
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

  CarregarOperacoes(): void {
    this.Carregando = true;
    this.firestore
      .collection(`notas_operacoes`, ref => ref.where('nota', '==', this.dados.id))
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({ id: c.payload.doc.id, ...(c.payload.doc.data() as NotasOperacoes) }))))
      .subscribe(data => {
        if (data.length > 0) {
          if (data.length > 1) {
            let auxTotal = 0;

            data.forEach(obj => {
              auxTotal += obj.quantidade * obj.preco_unitario;
            });

            data.forEach(obj => {
              const liq = ((this.dados.liquidacao / auxTotal) * obj.preco_total).toFixed(4);
              this.firestore.doc(`notas_operacoes/${obj.id}`).update({ liquido: liq });
            });
          } else {
            this.firestore.doc(`notas_operacoes/${data[0].id}`).update({ liquido: this.dados.liquidacao });
          }
          this.dataSource = data;
        } else {
          this.dataSource = [];
        }
        this.Carregando = false;
      });
  }

  ResetForm(): void {
    this.Form.reset();
    Object.keys(this.Form.controls).forEach(key => {
      this.Form.controls[key].setErrors(null);
    });
  }

  Excluir(item): void {
    this.firestore
      .doc(`notas_operacoes/` + item.id)
      .delete()
      .then(() => this.CarregarOperacoes());
  }
}
