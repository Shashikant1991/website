import {EngineAnimation} from '../../../shared/keyboards/engine/engine-animation';
import {Keyboard} from '../../../shared/keyboards/engine/keyboard.operators';
import {Terminal} from '../../../shared/keyboards/engine/terminal.operators';

export function loginScript(): Keyboard.EventsOperator {
    return function (queue: EngineAnimation): EngineAnimation {
        return queue.pipe(
            Terminal.prompt('nick', '~'),
            Keyboard.pause(),
            Keyboard.type('ssh root@reactgular.com\r'),
            Keyboard.pause(500),
            Keyboard.set('password: '),
            Keyboard.type('************\r'),
            Keyboard.pause(500),
            Keyboard.set('\rWelcome to Ubuntu 18.04.2 LTS (GNU/Linux 4.15.0-43-generic x86_64)\r\r' +
                ' * Documentation:  https://help.ubuntu.com\r' +
                ' * Management:     https://landscape.canonical.com\r' +
                ' * Support:        https://ubuntu.com/advantage\r\r' +
                '8 packages can be updated.\r' +
                '0 updates are security updates.\r')
        );
    };
}
