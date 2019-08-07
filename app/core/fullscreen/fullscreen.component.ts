import { Component, OnInit } from '@angular/core';
import * as screenfull from "screenfull";
import {Screenfull} from "screenfull";

@Component({
  selector: 'cdk-fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.scss']
})
export class FullscreenComponent implements OnInit {
	isFullscreen: boolean = false;
  	constructor() { }

  	ngOnInit() {
  	}

  	toggleFullscreen() {
		let sf = <Screenfull>screenfull

	    if (sf.enabled) {
			sf.toggle();
	      	this.isFullscreen = !this.isFullscreen;
	    }
  	}
}