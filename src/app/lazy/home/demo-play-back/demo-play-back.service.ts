import {Injectable} from '@angular/core';
import {BufferEvent, EventQueue, tapEvents} from 'rg-animated-typing';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {ComponentPlayback} from '../demo.types';
import {createComponentScript} from '../scripts/create-component.script';
import {createProjectScript} from '../scripts/create-project.script';
import {finishScript} from '../scripts/finish.script';
import {installAngularScript} from '../scripts/install-angular.script';
import {introScript} from '../scripts/intro.script';
import {loginScript} from '../scripts/login.script';
import {ngServerScript} from '../scripts/ng-serve.script';
import {Terminal} from '../scripts/terminal.operators';

@Injectable({providedIn: 'root'})
export class DemoPlayBackService {

    private readonly _layout$: ReplaySubject<string> = new ReplaySubject(1);

    private readonly _nanoScript$: Subject<Observable<BufferEvent>> = new Subject();

    private readonly _playBack$: Subject<ComponentPlayback> = new Subject();

    private readonly _stage$: ReplaySubject<string> = new ReplaySubject(1);

    public layout(): Observable<string> {
        return this._layout$.asObservable();
    }

    public nanoScripts(): Observable<Observable<BufferEvent>> {
        return this._nanoScript$.asObservable();
    }

    public play(cancel$: Observable<any>, pause$: Observable<boolean>): Observable<BufferEvent> {

        const path = '~/reactgular';
        const src = '~/reactgular/src/app';

        return EventQueue.create().pipe(
            tapEvents(() => this._layout$.next('single')),
            tapEvents(() => this._stage$.next('intro')),
            loginScript(),
            introScript(),
            installAngularScript(),
            createProjectScript(),
            ngServerScript(path),
            tapEvents(() => this._layout$.next('double')),
            tapEvents(() => this._stage$.next('browser')),
            Terminal.multiline([
                '## As you can see. This is an empty Angular project.',
                '## We got some work to do!'
            ], path, 2000),
            createComponentScript({
                cancel$,
                children$: this._nanoScript$,
                component: 'Summary',
                message: [
                    '## Let\'s start with a summary of who I am and what I do.'
                ],
                path,
                pause$,
                playBack$: this._playBack$
            }),
            createComponentScript({
                cancel$,
                children$: this._nanoScript$,
                component: 'Skills',
                message: [
                    '## Just 3 more components. Let\'s add a skills section next.'
                ],
                path,
                pause$,
                playBack$: this._playBack$
            }),
            createComponentScript({
                cancel$,
                children$: this._nanoScript$,
                component: 'Experience',
                message: [
                    '## Just 2 more components. Let\'s add a work history section next.'
                ],
                path,
                pause$,
                playBack$: this._playBack$
            }),
            createComponentScript({
                cancel$,
                children$: this._nanoScript$,
                component: 'Contact',
                message: [
                    '## One more component and we\'re done! Let\'s add a contact form next.'
                ],
                path,
                pause$,
                playBack$: this._playBack$
            }),
            finishScript(path)
        ).play(cancel$, pause$);
    }

    public playBack(): Observable<ComponentPlayback> {
        return this._playBack$.asObservable();
    }

    public stage(): Observable<string> {
        return this._stage$.asObservable();
    }
}
