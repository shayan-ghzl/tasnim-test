import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/services/api.service';
import { Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/features';
import { TaxActions } from '../store/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  btnLoading = false;

  formGroup = new FormGroup({
    username: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.maxLength(24)]),
    password: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.maxLength(24)]),
  });

  subscription = new Subscription();

  constructor(
    private apiService: ApiService,
    private store: Store<AppState>,
  ) { }

  @HostListener('document:keyup.enter')
  submit() {
    if (this.formGroup.invalid) {
      return;
    }

    this.subscription.add(
      this.apiService.signin(this.formGroup.value).pipe(
        tap((response) => {
          if (response) {
            this.store.dispatch(TaxActions.startEffect());
          }
        })
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
