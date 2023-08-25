import { Component, HostListener } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, finalize, tap } from 'rxjs';
import { TaxActions } from '../store/actions';
import { AppState } from '../store/features';
import { Store } from '@ngrx/store';
import { StorageService } from '../shared/services/storage.service';
import { Router } from '@angular/router';

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
      this.apiService.signup(this.formGroup.value).pipe(
        tap((response) => {
          if (response) {
            this.storageService.token = response.token;
            this.storageService.setMainToken(response.token);
            this.store.dispatch(TaxActions.startEffect());
            this.router.navigateByUrl('/taxs-list');
          }
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
