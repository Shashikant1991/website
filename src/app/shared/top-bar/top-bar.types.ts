import {Observable} from 'rxjs';

export interface TopBarMenu {
  active: Observable<boolean>;
  title: Observable<string>;
  url: Observable<string>;
}
