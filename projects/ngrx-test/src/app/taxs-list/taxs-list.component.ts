import { Component } from '@angular/core';
import { ITax } from '../shared/models/models';

@Component({
  selector: 'app-taxs-list',
  templateUrl: './taxs-list.component.html',
  styleUrls: ['./taxs-list.component.scss']
})
export class TaxsListComponent {
  taxs!: ITax[];

}
