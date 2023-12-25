import { Component, ViewChild } from '@angular/core';
import { AdHostDirective } from './shared/directives/ad-host.directive';
import { SquareComponent } from './shared/components/square/square.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


const componentConfig = [
  {
    component: () => import('./shared/components/square/square.component').then(com => com.SquareComponent),
    inputs: {
      date: 'hello world'
    }
  },
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(AdHostDirective, { static: true }) componentHost!: AdHostDirective;


  addSquare() {
    // this.componentHost.vcr.clear();

    const componentRef = this.componentHost.vcr.createComponent<SquareComponent>(SquareComponent);

    // way one:
    // this approach will not execute ngOnChange hook
    // componentRef.instance.data = 'hello world';

    // way two:
    componentRef.setInput('data', 'hello world');

    componentRef.instance.outEvent.pipe(
      takeUntilDestroyed()
    ).subscribe(response => console.log(response));
  }

  addSquareBaseOnConfig() {
    this.componentHost.vcr.clear();
    componentConfig.forEach((item) => {


    })
  }
}
