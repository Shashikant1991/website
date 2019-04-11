import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'ws-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandComponent {
}
