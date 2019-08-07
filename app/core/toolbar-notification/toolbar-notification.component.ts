import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'cdk-toolbar-notification',
  templateUrl: './toolbar-notification.component.html',
  styleUrls: ['./toolbar-notification.component.scss']
})
export class ToolbarNotificationComponent implements OnInit {
  cssPrefix = 'toolbar-notification';
  isOpen: Boolean = false;
  @Input() notificacoes = [];

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  delete(item) {}
}
