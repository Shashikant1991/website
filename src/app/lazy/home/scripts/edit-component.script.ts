import {Subject} from 'rxjs';
import {EngineAnimation} from '../../../shared/keyboards/engine/engine-animation';
import {reduceEvents} from '../../../shared/keyboards/engine/engine.operators';
import {Keyboard} from '../../../shared/keyboards/engine/keyboard.operators';
import {Terminal} from '../../../shared/keyboards/engine/terminal.operators';
import {CreateComponentOptions} from '../demo.types';
import {loadComponentBundles} from './load-component-bundles';

const bundles = loadComponentBundles();

export function editComponentScript(options: CreateComponentOptions, mode: 'html' | 'scss'): Keyboard.EventsOperator {
    const fileName = options.component.toLowerCase();
    const finished$: Subject<void> = new Subject();
    const bundle = bundles.get(options.component);

    let edit = EngineAnimation.create();
    const source = (mode === 'html' ? bundle.html : bundle.scss);
    const typing = source.map((str, indx) => {
        return (queue: EngineAnimation): EngineAnimation => {
            const html = mode === 'html' ? (indx + 1) / source.length : 1;
            const style = mode !== 'html' ? (indx + 1) / source.length : 0;
            return queue.pipe(
                Keyboard.type(Keyboard.escapeHtml(str) + '\r'),
                Keyboard.tap(() => options.playBack$.next({name: options.component, html, style}))
            );
        };
    });
    edit = edit.pipe(...typing);
    const script = edit.pipe(
        Keyboard.pause(2000),
        Keyboard.tap(() => finished$.next())
    ).streamUntil(options.pause$, options.cancel$).pipe(
        reduceEvents()
    );

    return function (queue: EngineAnimation): EngineAnimation {
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
            Keyboard.tap(() => options.children$.next(script)),
            // wait for it to finish
            Keyboard.pause(finished$)
        );
    };
}
