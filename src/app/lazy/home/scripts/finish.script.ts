import {EngineAnimation} from '../../../shared/keyboards/engine/engine-animation';
import {Keyboard} from '../../../shared/keyboards/engine/keyboard.operators';
import {Terminal} from '../../../shared/keyboards/engine/terminal.operators';

export function finishScript(path: string): Keyboard.EventsOperator {
    return function (queue: EngineAnimation): EngineAnimation {
        return queue.pipe(
            Terminal.multiline([
                '## My new website is all finished!',
                '## Thank you for watching and please give the website a try!'
            ], path, 1000),
            Terminal.multiline([
                '## Click anywhere to continue...'
            ], path, 0),
            Terminal.multiline(['exit'], path),
            Keyboard.newLine(),
            Keyboard.set('logout\r' +
                'Connection to reactgular.com closed.'),
        );
    };
}
