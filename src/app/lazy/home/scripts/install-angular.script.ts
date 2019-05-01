import {EngineAnimation} from '../../../shared/keyboards/engine/engine-animation';
import {Keyboard} from '../../../shared/keyboards/engine/keyboard.operators';
import {Terminal} from '../../../shared/keyboards/engine/terminal.operators';

export function installAngularScript(): Keyboard.EventsOperator {
    return function (queue: EngineAnimation): EngineAnimation {
        return queue.pipe(
            Terminal.multiline([
                'npm install -g @angular/cli'
            ]),
            Keyboard.newLine(),
            Keyboard.set(
                '+ @angular/cli@7.3.8\r' +
                'added 295 packages from 180 contributors in 1.588s'
            )
        );
    };
}
