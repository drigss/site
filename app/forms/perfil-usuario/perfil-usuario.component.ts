import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsuarioLogado } from '../../services/usuario.logado';
import { MatDialogRef } from '@angular/material';
import swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-usuario',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {
  hide = true;
  Form: FormGroup;
  dados: any = {};
  avatar: File = null;
  Carregando: Boolean = false;

  constructor(public usuarioLogado: UsuarioLogado, private fb: FormBuilder, private dialogRef: MatDialogRef<PerfilUsuarioComponent>) {
    this.Form = fb.group(
      {
        senha: [null, Validators.compose([null, Validators.minLength(6)])],
        senha2: null,
        avatar: null
      },
      {
        validator: passwordMatchValidator
      }
    );

    function passwordMatchValidator(g: FormGroup) {
      return g.get('senha').value === g.get('senha2').value ? null : g.get('senha2').setErrors({ mismatch: true });
    }
  }

  ngOnInit() {}

  handleFileInput(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.Form.get('avatar').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result
        });
      };
    }
  }

  Salvar(): void {
    if (this.Form.valid) {
      this.Carregando = true;
      const formModel = this.Form.value;
    }
  }
}
