import summaryCss from 'raw-loader!!./templates/summary.component.css.template';
import summaryHtml from 'raw-loader!!./templates/summary.component.html.template';
import summaryScss from 'raw-loader!!./templates/summary.component.scss.template';
import bookmarksCss from 'raw-loader!!./templates/bookmarks.component.css.template';
import bookmarksHtml from 'raw-loader!!./templates/bookmarks.component.html.template';
import bookmarksScss from 'raw-loader!!./templates/bookmarks.component.scss.template';
import {ComponentBundle} from '../demo.types';

function toArray(str: string): string[] {
    return str.replace(/\n/g, '').split('\r');
}

export function loadComponentBundles(): Map<string, ComponentBundle> {
    const bundle = new Map<string, ComponentBundle>();
    bundle.set('Summary', {html: toArray(summaryHtml), scss: toArray(summaryScss)});
    bundle.set('Bookmarks', {html: toArray(bookmarksHtml), scss: toArray(bookmarksScss)});
    return bundle;
}

export function loadComponentCss(): Map<string, string> {
    const bundle = new Map<string, string>();
    bundle.set('ws-summary', summaryCss);
    bundle.set('ws-bookmarks', bookmarksCss);
    return bundle;
}
