import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { CadastroCorretoraComponent } from 'src/app/forms/cadastro-corretora/cadastro-corretora.component';

@Component({
  selector: 'app-corretoras',
  templateUrl: './corretoras.component.html',
  styleUrls: ['./corretoras.component.scss']
})
export class CorretorasComponent implements OnInit {
  public displayedColumns = ['select', 'nome', 'cnpj', 'banco', 'agencia', 'conta'];
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
      .collection(`corretoras`)
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))))
      .subscribe(data => {
        this.dataSource = data;
        this.Carregando = false;
      });
  }

  NovoRegistro(): void {
    const dialogRef = this.dialog.open(CadastroCorretoraComponent, {
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
              this.firestore.doc(`corretoras/` + item).delete();
            });
          }
        });
    } else {
      swal.fire('Atenção!', 'Selecione algum registro para excluir!', 'warning');
    }
  }

  EditarRegistro(item): void {
    const dialogRef = this.dialog.open(CadastroCorretoraComponent, {
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
