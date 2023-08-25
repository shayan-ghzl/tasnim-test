import { Component, HostListener } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { TaxActions } from '../store/actions';
import { AppState } from '../store/features';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  btnLoading = false;

  formGroup = new FormGroup({
    email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.email]),
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
      this.apiService.signup(this.formGroup.value).pipe(
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
