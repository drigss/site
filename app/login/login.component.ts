import { Component, OnInit, ViewEncapsulation, NgZone } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { EncrDecrService } from '../services/encr-decr.service';
import swal from 'sweetalert2';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  today: number = Date.now();
  dados: any = {};
  Carregando: Boolean = false;
  Form: FormGroup;
  Url: string;

  validacao_mensagens = {
    email: [{ type: 'required', message: 'E-mail é requerido' }],
    senha: [{ type: 'required', message: 'Senha é requerido' }]
  };

  constructor(
    private EncrDecr: EncrDecrService,
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.Carregando = false;
    this.Form = this.formBuilder.group({
      email: [null, Validators.required],
      senha: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.dados = {};
  }

  AcessarSistema(): void {
    if (this.Form.valid) {
      this.firestore
        .collection(`usuarios`, ref =>
          ref
            .where('email', '==', this.dados.email)
            .where('senha', '==', this.EncrDecr.set('ecc0f25e8026ace98dd236ece0fec41b', this.dados.senha))
        )
        .snapshotChanges()
        .pipe(map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))))
        .subscribe(data => {
          this.Carregando = false;
          if (data.length > 0) {
            localStorage.setItem('@Corretagem', JSON.stringify(data[0]));
            this.router.navigate(['/principal']);
          } else {
            swal.fire({
              title: 'Atenção!',
              type: 'warning',
              text: 'Usuário não encontrado ou senha inválida!'
            });
          }
        });
    }
  }
}
