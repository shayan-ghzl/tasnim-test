import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent {

  @Input() data = '';
  @Output() outEvent = new EventEmitter<string>();

  ngOnInit(): void {
    console.log(this.data, 'on init');
  }

  ngOnChange(changes: SimpleChanges): void {
    console.log(changes);
  }

}
