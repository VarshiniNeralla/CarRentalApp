import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { CommonModule } from '@angular/common';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { UserOutline, LockOutline } from '@ant-design/icons-angular/icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    RouterModule,
    NzSpinModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzLayoutModule,
    ReactiveFormsModule,
    NzIconModule
  ],
  providers: [
    { provide: NzIconService, useClass: NzIconService }
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isSpinning: boolean = false;
  loginForm!: FormGroup;
  private apiUrl = 'http://localhost:3000/users';
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private iconService: NzIconService,
    private router: Router,
    private http: HttpClient,
    private storageService: StorageService
  ) {

    this.iconService.addIcon(UserOutline, LockOutline);
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  // login() {
  //   if (this.loginForm.valid) {
  //     const { email, password } = this.loginForm.value;
  //     this.isSpinning = true;

  //     this.http.get<any[]>(this.apiUrl).subscribe(users => {
  //       const user = users.find(u => u.email === email && u.password === password);

  //       if (user) {
  //         this.message.success('Login successful!');
  //         this.storageService.saveUserDetails(user);

  //         if (this.storageService.isAdminLoggedIn()) {
  //           this.router.navigateByUrl("/admin/dashboard")
  //         } else if (this.storageService.isCustomerLoggedIn()) {
  //           this.router.navigateByUrl("/customer/dashboard");
  //         } else {
  //           this.message.error('Invalid email or password. Please try again.');
  //         }
  //       }
  //       this.isSpinning = false;
  //     }, error => {
  //       this.message.error('Error connecting to the server.');
  //       this.isSpinning = false;
  //     });

  //   } else {
  //     this.message.error('Please fill in all required fields correctly.');
  //   }
  // }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.isSpinning = true;
  
      this.http.get<any[]>(this.apiUrl).subscribe(users => {
        const user = users.find(u => u.email === email && u.password === password);
  
        if (user) {
          console.log("User found:", user);  // ✅ Add this line for debugging
  
          this.message.success('Login successful!');
          this.storageService.saveUserDetails(user);
  
          if (this.storageService.isAdminLoggedIn()) {
            this.router.navigateByUrl("/admin/dashboard");
          } else if (this.storageService.isCustomerLoggedIn()) {
            this.router.navigateByUrl("/customer/dashboard");
          } else {
            this.message.error('Invalid email or password. Please try again.');
          }
        } else {
          this.message.error('User not found. Please check your credentials.');
        }
        this.isSpinning = false;
      }, error => {
        this.message.error('Error connecting to the server.');
        this.isSpinning = false;
      });
  
    } else {
      this.message.error('Please fill in all required fields correctly.');
    }
  }
  
}



