import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/services/api.service';
import { Subscription, finalize, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/features';
import { TaxActions } from '../store/actions';
import { AuthStatus, StorageService } from '../shared/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  btnLoading = false;

  formGroup = new FormGroup({
    email: new FormControl({ value: '', disabled: false }, { validators: [Validators.required, Validators.maxLength(24)], nonNullable: true }),
    password: new FormControl({ value: '', disabled: false }, { validators: [Validators.required, Validators.maxLength(24)], nonNullable: true }),
  });

  subscription = new Subscription();

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private store: Store<AppState>,
    private router: Router,
  ) { }

  @HostListener('document:keyup.enter')
  submit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.btnLoading = true;

    this.subscription.add(
      this.apiService.signin(this.formGroup.value as { email: string; password: string; }).pipe(
        tap((response) => {
          if (response) {
            this.storageService.token = response.access_token;
            this.storageService.authenticationStatus = AuthStatus.passes;
            this.storageService.setMainToken(response.access_token);
            this.store.dispatch(TaxActions.startEffect());
            this.router.navigateByUrl('/taxs-list');
          }
          // TODO: raise a toast
        }),
        finalize(() => {
          this.btnLoading = false;
        })
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
