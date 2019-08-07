import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { PerfilUsuarioComponent } from '../../forms/perfil-usuario/perfil-usuario.component';
import { MatDialog } from '@angular/material';
import { UsuarioLogado } from 'src/app/services/usuario.logado';
import { Router } from '@angular/router';

@Component({
  selector: 'cdk-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  isOpen: Boolean = false;

  @Input() currentUser = null;
  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement) {
      return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isOpen = false;
    }
  }

  constructor(public usuarioLogado: UsuarioLogado, private elementRef: ElementRef, private dialog: MatDialog, private router: Router) {}

  ngOnInit() {}

  Perfil(): void {
    const dialogRef = this.dialog.open(PerfilUsuarioComponent, {
      width: '550px',
      hasBackdrop: true,
      disableClose: true
    });
  }

  Sair(): void {
    localStorage.removeItem('@Corretagem');
    this.router.navigate(['/']);
  }
}
