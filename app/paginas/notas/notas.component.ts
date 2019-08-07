import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { CadastroNotaComponent } from 'src/app/forms/cadastro-nota/cadastro-nota.component';
import { OperacoesNotaComponent } from 'src/app/forms/operacoes-nota/operacoes-nota.component';
import { Notas } from 'src/app/models/notas';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit {
  public displayedColumns = ['select', 'operacoes', 'corretora_desc', 'numero_nota', 'data_nota'];
  public dataSource = [];
  selection = new SelectionModel<string>(true, []);
  dataLength: number;
  Carregando: Boolean = false;
  Pesquisa: any = {};

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private firestore: AngularFirestore, private dialog: MatDialog) {}

  ngOnInit() {
    this.Pesquisa.descricao = '';
    this.Carregar(null);
  }

  Carregar(event: PageEvent): void {
    this.Carregando = true;
    this.firestore
      .collection(`notas`, ref => ref.orderBy('created_time', 'desc'))
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({
            id: c.payload.doc.id,
            corretora_ref: c.payload.doc.ref,
            ...(c.payload.doc.data() as Notas)
          }))
        )
      )
      .subscribe(data => {
        if (data.length > 0) {
          data.forEach(doc => {
            if (doc.corretora_ref) {
              doc.corretora_ref
                .get()
                .then(res => {
                  doc.corretora_desc = res.data().nome;
                  this.dataSource = data;
                  this.Carregando = false;
                })
                .catch(err => console.error(err));
            }
          });
        } else {
          this.dataSource = [];
          this.Carregando = false;
        }
      });
  }

  Operacoes(item): void {
    const dialogRef = this.dialog.open(OperacoesNotaComponent, {
      width: '800px',
      hasBackdrop: true,
      disableClose: true,
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  NovoRegistro(): void {
    const dialogRef = this.dialog.open(CadastroNotaComponent, {
      width: '800px',
      hasBackdrop: true,
      disableClose: true,
      data: { id: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.Carregar(null);
    });
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.forEach(row => this.selection.select(row.id));
  }

  ExcluirSelecionados(): void {
    if (this.selection.selected.length > 0) {
      swal
        .fire({
          title: 'Atenção',
          text: 'Deseja excluir o(s) registro(s) selecionado(s)?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim',
          cancelButtonText: 'Não'
        })
        .then(result => {
          if (result.value) {
            this.selection.selected.forEach(item => {
              this.firestore.doc(`notas/` + item).delete();
            });
            this.Carregar(null);
          }
        });
    } else {
      swal.fire('Atenção!', 'Selecione algum registro para excluir!', 'warning');
    }
  }

  EditarRegistro(item): void {
    const dialogRef = this.dialog.open(CadastroNotaComponent, {
      width: '800px',
      hasBackdrop: true,
      disableClose: true,
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      this.Carregar(null);
    });
  }

  onPaginateChange(event: PageEvent) {
    this.Carregar(event);
  }

  Pesquisar(): void {
    this.Carregar(null);
  }
}
