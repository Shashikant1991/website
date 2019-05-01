import {EngineAnimation} from '../../../shared/keyboards/engine/engine-animation';
import {Keyboard} from '../../../shared/keyboards/engine/keyboard.operators';
import {Terminal} from '../../../shared/keyboards/engine/terminal.operators';

export function introScript(): Keyboard.EventsOperator {
    return function (queue: EngineAnimation): EngineAnimation {
        return queue.pipe(
            Terminal.multiline([
                '## Hi, My name is Nick Foscarini.',
                '## I\'m a Full Stack Developer living near Toronto, Canada.',
                '## I like to code in JavaScript and many other languages.',
                '## I have over 10+ years of experience.',
                '## You caught me in the middle of making my website.',
                '## Why don\'t you stay and watch while I finish it!'
            ], '~', 2000)
        );
    };
}
