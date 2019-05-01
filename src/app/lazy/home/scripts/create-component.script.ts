import {EngineAnimation} from '../../../shared/keyboards/engine/engine-animation';
import {Keyboard} from '../../../shared/keyboards/engine/keyboard.operators';
import {CreateComponentOptions} from '../demo.types';
import {editComponentScript} from './edit-component.script';

export function createComponentScript(options: CreateComponentOptions): Keyboard.EventsOperator {
    return function (queue: EngineAnimation): EngineAnimation {
        const fileName = options.component.toLowerCase();
        return queue.pipe(
            // Terminal.multiline(options.message, options.path, 2000),
            // Terminal.multiline([
            //     `ng generate component ${options.component} --defaults`
            // ], options.path),
            // Keyboard.newLine(),
            // Keyboard.set(
            //     `{{3}}CREATE{{0}} src/app/${fileName}.component.html (0 bytes)\r` +
            //     `{{3}}CREATE{{0}} src/app/${fileName}.component.ts (274 bytes)\r` +
            //     `{{3}}CREATE{{0}} src/app/${fileName}.component.scss (0 bytes)\r` +
            //     'UPDATE src/app/app.module.ts (479 bytes)\r'
            // ),
            Keyboard.tap(() => options.playBack$.next({name: options.component, html: 0, style: 0})),
            editComponentScript(options, 'html'),
            editComponentScript(options, 'scss')
        );
    };
}
