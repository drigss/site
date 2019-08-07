import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cdk-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  @Input() iconOnly: boolean = false;

  public menus = [];

  constructor() {}

  ngOnInit() {
    this.menus = [
      {
        name: 'Dashboard',
        icon: 'dashboard',
        link: '/principal',
        open: false
      },
      {
        name: 'Operações',
        icon: 'widgets',
        link: false,
        open: false,
        sub: [
          {
            name: 'Notas de Corretagem',
            link: '/notas',
            icon: 'money',
            chip: false
          },
          {
            name: 'Importar Notas',
            link: false,
            icon: false,
            chip: false
          },
          {
            name: 'Proventos (Dividendos / Juros)',
            link: false,
            icon: false,
            chip: false
          },
          {
            name: 'Desdobramentos',
            link: false,
            icon: false,
            chip: false
          },
        ]
      },
      {
        name: 'Depositos e Retiradas',
        icon: 'widgets',
        link: false,
        open: false,
        sub: [
          {
            name: 'Cadastrar Movimentação',
            link: '/notas', // alterar
            icon: 'money',
            chip: false
          }
        ]
      },
      {
        name: 'Imposto de Renda',
        icon: 'widgets',
        link: false,
        open: false,
        sub: [
          {
            name: 'Gerar DARF',
            link: false,
            icon: false,
            chip: false
          }
        ]
      },
      {
        name: 'Cadastros',
        icon: 'settings_applications',
        link: false,
        open: false,
        sub: [
          {
            name: 'Corretoras',
            link: '/corretoras',
            icon: 'account_balance',
            chip: false
          },
          {
            name: 'Usuários',
            link: '/usuarios',
            icon: 'accessibility',
            chip: false
          }
        ]
      },
      {
        name: 'Menu Teste',
        icon: 'settings_applications',
        link: false,
        open: false,
        sub: [
          {
            name: 'Teste',
            link: '/pg-teste',
            icon: 'account_balance',
            chip: false
          }
        ]
      }
    ];
  }
}
