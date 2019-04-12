import {EmitterAction, Receiver} from '@ngxs-labs/emitter';
import {Selector, State, StateContext} from '@ngxs/store';
import {AppModel} from './app.model';

type AppContext = StateContext<AppModel>;

@State<AppModel>({
    name: 'app',
    defaults: {
        scroll: 0
    }
})
export class AppState {
    @Selector()
    public static scroll(state: AppModel) {
        return state.scroll;
    }

    @Receiver({payload: 0})
    public static setScroll(ctx: AppContext, {payload}: EmitterAction<number>) {
        ctx.setState({scroll: payload});
    }

    @Selector()
    public static topBarHeight(state: AppModel) {
        return Math.max(60, 135 - state.scroll);
    }
}
