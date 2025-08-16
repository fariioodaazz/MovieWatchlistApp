import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  submitting = false;
  error = '';

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  private returnUrl = '/movies/list';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const r = this.route.snapshot.queryParamMap.get('returnUrl');
    if (r) this.returnUrl = r;
  }

  submit() {
    this.error = '';
    if (this.form.invalid) return;
    this.submitting = true;

    const ok = this.auth.login(this.form.value.username!, this.form.value.password!);
    this.submitting = false;

    if (ok) this.router.navigateByUrl(this.returnUrl);
    else this.error = 'Invalid credentials. Try admin / 12345678.';
  }
}
