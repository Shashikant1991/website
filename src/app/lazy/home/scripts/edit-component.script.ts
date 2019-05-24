import {EventQueue, EventsOperator, pause, tapEvents, typeChars} from '@typewriterjs/typewriterjs';
import {Subject} from 'rxjs';
import {CreateComponentOptions} from '../demo.types';
import {loadComponentBundles} from './load-component-bundles';
import {Terminal} from './terminal.operators';

const bundles = loadComponentBundles();

export function editComponentScript(options: CreateComponentOptions, mode: 'html' | 'scss'): EventsOperator {
    const fileName = options.component.toLowerCase();
    const finished$: Subject<void> = new Subject();
    const bundle = bundles.get(options.component);

    let edit = EventQueue.create();
    const source = (mode === 'html' ? bundle.html : bundle.scss);
    const typing = source.map((str, indx) => {
        return (queue: EventQueue): EventQueue => {
            const html = mode === 'html' ? (indx + 1) / source.length : 1;
            const style = mode !== 'html' ? (indx + 1) / source.length : 0;
            return queue.pipe(
                // typeChars(Keyboard.escapeHtml(str) + '\r'),
                typeChars(str + '\r'),
                tapEvents(() => options.playBack$.next({name: options.component, html, style}))
            );
        };
    });
    edit = edit.pipe(...typing);
    const script = edit.pipe(
        pause(2000),
        tapEvents(() => finished$.next())
    ).play(options.cancel$, options.pause$);

    return function (queue: EventQueue): EventQueue {
        return queue.pipe(
            Terminal.multiline([
                mode === 'html'
                    ? `## Let\'s give the ${fileName} component some HTML.`
                    : `## The ${fileName} component needs some CSS styles.`
            ], options.path, 2000),
            Terminal.multiline([
                `nano src/app/${fileName}.component.${mode}`
            ], options.path),
            // play the nano script
            tapEvents(() => options.children$.next(script)),
            // wait for it to finish
            pause(finished$)
        );
    };
}
