/*
 * Do not modify this file, it will be auto-generated.
 */
import {
    Link,
    RenderingContextBinding,
    AbstractRenderingComponent
} from '@ibm-wch-sdk/ng';
import {
    Observable
} from 'rxjs/Observable';

/*
 * @name Web component
 * @id 904a15db-ca1f-4fbb-b713-0e680b018409
 * @description A content type that renders an imported web component on the page.
 */
export abstract class AbstractWebComponent extends AbstractRenderingComponent {

    /*
     * {
     *   "elementType": "link",
     *   "helpText": "The import link is the path to the web component HTML file. This can be an internal WCH link, or an external link.",
     *   "key": "importLink",
     *   "label": "Import link",
     *   "required": true
     * }
     */
    @RenderingContextBinding('link.importLink')
    readonly onImportLink: Observable<Link>;

    /*
     * @see #onImportLink
     */
    @RenderingContextBinding()
    readonly importLink: Link;

    /*
     * {
     *   "elementType": "text",
     *   "helpText": "The tag name is the HTML tag for the web component to be rendered. This can be found in the web component file.",
     *   "key": "tagName",
     *   "label": "Tag name",
     *   "minLength": 1,
     *   "required": true
     * }
     */
    @RenderingContextBinding('text.tagName')
    readonly onTagName: Observable<string>;

    /*
     * @see #onTagName
     */
    @RenderingContextBinding()
    readonly tagName: string;

    /*
     * {
     *   "allowMultipleValues": true,
     *   "elementType": "text",
     *   "fieldLabel": "Attributes",
     *   "helpText": "Add configuration attributes here. Format: name=\"value\"",
     *   "key": "attributesList",
     *   "label": "Attributes list",
     *   "minimumValues": 0,
     *   "required": false
     * }
     */
    @RenderingContextBinding('texts.attributesList', [])
    readonly onAttributesList: Observable<string[]>;

    /*
     * @see #onAttributesList
     */
    @RenderingContextBinding()
    readonly attributesList: string[];

    /*
     * {
     *   "elementType": "text",
     *   "helpText": "This is the text that goes in between  the web component tags",
     *   "key": "innerText",
     *   "label": "Inner text"
     * }
     */
    @RenderingContextBinding('text.innerText', '')
    readonly onInnerText: Observable<string>;

    /*
     * @see #onInnerText
     */
    @RenderingContextBinding()
    readonly innerText: string;

    protected constructor() {
        super();
    }
}
