import {cssClass, EventQueue, EventsOperator, pause, pressNewLine, setChars, typeChars} from 'rg-animated-typing';

export namespace Terminal {
    export function prompt(domain: string, path: string): EventsOperator {
        return function (queue: EventQueue): EventQueue {
            return queue.pipe(
                cssClass('green'),
                setChars(domain),
                cssClass(),
                setChars(':'),
                cssClass('blue'),
                setChars(path),
                cssClass(),
                setChars('$ ')
            );
        };
    }

    export function multiline(lines: string[], path: string = '~', p: number = 500): EventsOperator {
        return function (queue: EventQueue): EventQueue {
            lines.forEach(line => {
                const c = line.startsWith('##') ? 'yellow' : '';
                queue = queue.pipe(
                    pressNewLine(),
                    Terminal.prompt('root', path),
                    pause(500),
                    cssClass(c),
                    typeChars(line),
                    cssClass(),
                    pause(p)
                );
            });
            return queue;
        };
    }
}
