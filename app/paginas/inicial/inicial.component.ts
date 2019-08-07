import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.scss']
})
export class InicialComponent implements OnInit {
  @Input() isVisible: boolean = true;
  visibility = 'shown';

  sideNavOpened: boolean = true;
  matDrawerOpened: boolean = false;
  matDrawerShow: boolean = true;
  sideNavMode: string = 'side';
  constructor(private media: MediaObserver, public snackBar: MatSnackBar) {}

  ngOnChanges() {
    this.visibility = this.isVisible ? 'shown' : 'hidden';
  }

  ngOnInit() {
    this.media.media$.subscribe((mediaChange: MediaChange) => {
      this.toggleView();
    });
  }

  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation;
  }

  toggleView() {
    if (this.media.isActive('gt-md')) {
      this.sideNavMode = 'side';
      this.sideNavOpened = true;
      this.matDrawerOpened = false;
      this.matDrawerShow = true;
    } else if (this.media.isActive('gt-xs')) {
      this.sideNavMode = 'side';
      this.sideNavOpened = false;
      this.matDrawerOpened = true;
      this.matDrawerShow = true;
    } else if (this.media.isActive('lt-sm')) {
      this.sideNavMode = 'over';
      this.sideNavOpened = false;
      this.matDrawerOpened = false;
      this.matDrawerShow = false;
    }
  }
}
