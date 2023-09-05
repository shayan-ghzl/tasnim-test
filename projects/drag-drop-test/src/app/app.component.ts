import { Component, ViewChild } from '@angular/core';
import { AdHostDirective } from './shared/directives/ad-host.directive';
import { SquareComponent } from './shared/components/square/square.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(AdHostDirective, { static: true }) componentHost!: AdHostDirective;


  addSquare() {
    const componentRef = this.componentHost.vcr.createComponent<SquareComponent>(SquareComponent);
    componentRef.instance.data = 'hello world';
  }
}
