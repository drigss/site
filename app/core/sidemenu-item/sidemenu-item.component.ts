import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'cdk-sidemenu-item',
  templateUrl: './sidemenu-item.component.html',
  styleUrls: ['./sidemenu-item.component.scss']
})
export class SidemenuItemComponent implements OnInit {
  @Input() menu;
  @Input() iconOnly: boolean;
  @Input() secondaryMenu = false;

  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit() {}

  openLink() {
    this.menu.open = this.menu.open;
  }

  chechForChildMenu() {
    return this.menu && this.menu.sub ? true : false;
  }
}
