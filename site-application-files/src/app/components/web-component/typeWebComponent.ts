/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import {
    RenderingContext
} from 'ibm-wch-sdk-ng';
import { Component } from '@angular/core';
import { AbstractWebComponent } from './abstractWebComponent';

/*
 * @name Web component
 * @id 904a15db-ca1f-4fbb-b713-0e680b018409
 * @description A content type that renders an imported web component on the page.
 */
/* TODO uncomment this if you plan to use the component standalone, i.e. not as the basis of a layout.
@Component({
  selector: 'app-type-web-component',
  templateUrl: './typeWebComponent.html',
  styleUrls: ['./typeWebComponent.scss']
})
*/
export class TypeWebComponent extends AbstractWebComponent {

    /*
     * TODO add custom fields here. These fields should be those
     * common to all layouts.
     */

    constructor() {
        super();
        /*
         * TODO initialize your custom fields here, note that
         * you can refer to the values bound via @RenderingContextBinding from
         * your super class.
         *
         * Make sure to call 'this.safeSubscribe' if you plan to subscribe to observables
         */
    }

}
