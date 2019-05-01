import contactCss from 'raw-loader!./templates/contact.component.css.template';
import contactHtml from 'raw-loader!./templates/contact.component.html.template';
import contactScss from 'raw-loader!./templates/contact.component.scss.template';
import experienceCss from 'raw-loader!./templates/experience.component.css.template';
import experienceHtml from 'raw-loader!./templates/experience.component.html.template';
import experienceScss from 'raw-loader!./templates/experience.component.scss.template';
import skillsCss from 'raw-loader!./templates/skills.component.css.template';
import skillsHtml from 'raw-loader!./templates/skills.component.html.template';
import skillsScss from 'raw-loader!./templates/skills.component.scss.template';
import summaryCss from 'raw-loader!./templates/summary.component.css.template';
import summaryHtml from 'raw-loader!./templates/summary.component.html.template';
import summaryScss from 'raw-loader!./templates/summary.component.scss.template';
import {ComponentBundle} from '../demo.types';

function toArray(str: string): string[] {
    return str.replace(/\n/g, '').split('\r');
}

export function loadComponentBundles(): Map<string, ComponentBundle> {
    const bundle = new Map<string, ComponentBundle>();
    bundle.set('Contact', {html: toArray(contactHtml), scss: toArray(contactScss)});
    bundle.set('Experience', {html: toArray(experienceHtml), scss: toArray(experienceScss)});
    bundle.set('Skills', {html: toArray(skillsHtml), scss: toArray(skillsScss)});
    bundle.set('Summary', {html: toArray(summaryHtml), scss: toArray(summaryScss)});
    return bundle;
}

export function loadComponentCss(): Map<string, string> {
    const bundle = new Map<string, string>();
    bundle.set('ws-contact', contactCss);
    bundle.set('ws-experience', experienceCss);
    bundle.set('ws-skills', skillsCss);
    bundle.set('ws-summary', summaryCss);
    return bundle;
}
