import {EngineAnimation} from '../../../shared/keyboards/engine/engine-animation';
import {Keyboard} from '../../../shared/keyboards/engine/keyboard.operators';
import {Terminal} from '../../../shared/keyboards/engine/terminal.operators';

export function createProjectScript(): Keyboard.EventsOperator {
    return function (queue: EngineAnimation): EngineAnimation {
        return queue.pipe(
            Terminal.multiline([
                'ng new reactgular --defaults --minimal --routing=true --style=scss'
            ]),
            Keyboard.newLine(),
            Keyboard.set(
                '{{3}}CREATE{{0}} reactgular/angular.json (3931 bytes)\r' +
                '{{3}}CREATE{{0}} reactgular/package.json (1309 bytes)\r' +
                '{{3}}CREATE{{0}} reactgular/README.md (1027 bytes)\r' +
                '{{3}}CREATE{{0}} reactgular/tsconfig.json (435 bytes)\r' +
                '{{3}}CREATE{{0}} reactgular/.gitignore (629 bytes)\r' +
                '{{3}}CREATE{{0}} reactgular/src/favicon.ico (5430 bytes)\r' +
                '{{3}}CREATE{{0}} reactgular/src/index.html (297 bytes)\r' +
                '{{3}}CREATE{{0}} reactgular/src/main.ts (372 bytes)\r' +
                '{{3}}CREATE{{0}} reactgular/src/polyfills.ts (2841 bytes)\r' +
                '{{3}}CREATE{{0}} reactgular/src/styles.scss (80 bytes)\r' +
                '{{3}}CREATE{{0}} reactgular/src/browserslist (388 bytes)\r' +
                '{{3}}CREATE{{0}} reactgular/src/tsconfig.app.json (166 bytes)\r' +
                '{{3}}CREATE{{0}} reactgular/src/assets/.gitkeep (0 bytes)\r' +
                '{{3}}CREATE{{0}} reactgular/src/environments/environment.prod.ts (51 bytes)\r' +
                '{{3}}CREATE{{0}} reactgular/src/environments/environment.ts (662 bytes)\r' +
                '{{3}}CREATE{{0}} reactgular/src/app/app-routing.module.ts (245 bytes)\r' +
                '{{3}}CREATE{{0}} reactgular/src/app/app.module.ts (393 bytes)\r' +
                '{{3}}CREATE{{0}} reactgular/src/app/app.component.ts (215 bytes)\r' +
                '> node-sass@4.11.0 install ~/reactgular/node_modules/node-sass\r' +
                '> node scripts/install.js\r\r' +
                'added 914 packages from 514 contributors and audited 42608 packages in 2.849s\r'
            ),
            Terminal.multiline([
                'cd reactgular'
            ]),
        );
    };
}
