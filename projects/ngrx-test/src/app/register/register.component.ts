import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Subscription, finalize, tap } from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { AuthStatus, StorageService } from '../shared/services/storage.service';
import { TaxActions } from '../store/actions';
import { AppState } from '../store/features';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule,
    InputTextModule
  ],
  standalone: true
})
export class RegisterComponent {
  btnLoading = false;

  formGroup = new FormGroup({
    email: new FormControl({ value: '', disabled: false }, { validators: [Validators.required, Validators.email], nonNullable: true }),
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
      this.apiService.signup(this.formGroup.value as { email: string; password: string; }).pipe(
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
