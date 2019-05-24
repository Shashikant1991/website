import {EventQueue, EventsOperator, pressNewLine, setChars, tapEvents} from '@typewriterjs/typewriterjs';
import {CreateComponentOptions} from '../demo.types';
import {editComponentScript} from './edit-component.script';
import {Terminal} from './terminal.operators';

export function createComponentScript(options: CreateComponentOptions): EventsOperator {
    return function (queue: EventQueue): EventQueue {
        const fileName = options.component.toLowerCase();
        return queue.pipe(
            Terminal.multiline(options.message, options.path, 2000),
            Terminal.multiline([
                `ng generate component ${options.component} --defaults`
            ], options.path),
            pressNewLine(),
            setChars(
                `{{3}}CREATE{{0}} src/app/${fileName}.component.html (0 bytes)\r` +
                `{{3}}CREATE{{0}} src/app/${fileName}.component.ts (274 bytes)\r` +
                `{{3}}CREATE{{0}} src/app/${fileName}.component.scss (0 bytes)\r` +
                'UPDATE src/app/app.module.ts (479 bytes)\r'
            ),
            tapEvents(() => options.playBack$.next({name: options.component, html: 0, style: 0})),
            editComponentScript(options, 'html'),
            editComponentScript(options, 'scss')
        );
    };
}
