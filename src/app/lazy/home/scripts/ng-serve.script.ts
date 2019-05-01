import {EngineAnimation} from '../../../shared/keyboards/engine/engine-animation';
import {Keyboard} from '../../../shared/keyboards/engine/keyboard.operators';
import {Terminal} from '../../../shared/keyboards/engine/terminal.operators';

export function ngServerScript(path: string): Keyboard.EventsOperator {
    return function (queue: EngineAnimation): EngineAnimation {
        return queue.pipe(
            Terminal.multiline([
                '## That was easy. Let\'s see what we\'ve got so far.'
            ], path, 2000),
            Terminal.multiline([
                'ng serve --prod --watch --open &'
            ], path),
            Keyboard.newLine(),
            Keyboard.set(
                'chunk {{{3}}main{{0}}} {{1}}main.js, main.js.map{{0}} (main) 9.76 kB {{3}}[initial] {{1}}[rendered]{{0}}\r' +
                'chunk {{{3}}polyfills{{0}}} {{1}}polyfills.js, polyfills.js.map{{0}} ' +
                '(polyfills) 237 kB {{3}}[initial] {{1}}[rendered]{{0}}\r' +
                'chunk {{{3}}runtime{{0}}} {{1}}runtime.js, runtime.js.map{{0}} (runtime) 6.08 kB {{3}}[entry] {{1}}[rendered]{{0}}\r' +
                'chunk {{{3}}styles{{0}}} {{1}}styles.js, styles.js.map{{0}} (styles) 16.6 kB {{3}}[initial] {{1}}[rendered]{{0}}\r' +
                'chunk {{{3}}vendor{{0}}} {{1}}vendor.js, vendor.js.map{{0}} (vendor) 3.52 MB {{3}}[initial] {{1}}[rendered]{{0}}\r' +
                'i ｢wdm｣: Compiled successfully.\r'
            )
        );
    };
}
