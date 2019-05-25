import {lines as summaryHtml} from './templates/summary.component.html';
import {lines as summaryScss} from './templates/summary.component.scss';
import {lines as summaryCss} from './templates/summary.component.css';
import {lines as bookmarksHtml} from './templates/bookmarks.component.html';
import {lines as bookmarksScss} from './templates/bookmarks.component.scss';
import {lines as bookmarksCss} from './templates/bookmarks.component.css';

import {ComponentBundle} from '../demo.types';

function toArray(str: string): string[] {
    return str.replace(/\n/g, '').split('\r');
}

export function loadComponentBundles(): Map<string, ComponentBundle> {
    const bundle = new Map<string, ComponentBundle>();
    bundle.set('Summary', {html: summaryHtml, scss: summaryScss});
    bundle.set('Bookmarks', {html: bookmarksHtml, scss: bookmarksScss});
    return bundle;
}

export function loadComponentCss(): Map<string, string> {
    const bundle = new Map<string, string>();
    bundle.set('ws-summary', summaryCss.join(' '));
    bundle.set('ws-bookmarks', bookmarksCss.join(' '));
    return bundle;
}
