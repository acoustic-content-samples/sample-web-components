/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import {
    LayoutComponent
} from 'ibm-wch-sdk-ng';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { TypeWebComponent } from './../../components/web-component/typeWebComponent';

/*
 * @name webComponentLayout
 * @id web-component-layout
 */
@LayoutComponent({
    selector: 'web-component-layout'
})
@Component({
  selector: 'app-web-component-layout-component',
  templateUrl: './webComponentLayout.html',
  styleUrls: ['./webComponentLayout.scss']
})
export class WebComponentLayoutComponent extends TypeWebComponent implements AfterViewInit, OnDestroy {

    /*
     * TODO add custom fields here. These fields should be those
     * specific to this layout.
     */
    elemStr: string;
    link: any;

    constructor() {
        super();
		this.elemStr = "";
		this.safeSubscribe(this.onRenderingContext, (renderingContext) => {
			this.loadWebComponent(renderingContext);
		});
    }

	ngAfterViewInit(){
	   super.ngAfterViewInit();
	}

	ngOnDestroy() {
		super.ngOnDestroy();
		this.link.remove();
	}

	loadWebComponent(renderingContext) {
		//no promise needed as the browser should act on the web-component element once its defined.
		if (this.link) {
			 this.link.remove();
		}
	    this.link = document.createElement('link');
	    this.link.setAttribute('rel', 'import');
	    this.link.setAttribute('href', renderingContext.elements.importLink.linkURL);
			document.body.appendChild(this.link);
			let attrList = '';
			renderingContext.elements.attributesList.values.forEach((attr) => {
			   attrList += attr + " ";
			});

	    this.elemStr = `<${this.tagName} ${attrList}>${this.innerText}</${this.tagName}>`;
    }
}
