// // import { Component } from '@angular/core';
// // import { RouterModule } from '@angular/router';
// // import { NzSpinModule } from 'ng-zorro-antd/spin';
// // import { NzFormModule } from 'ng-zorro-antd/form';
// // import { NzButtonModule } from 'ng-zorro-antd/button';
// // import { NzInputModule } from 'ng-zorro-antd/input';
// // import { NzLayoutModule } from 'ng-zorro-antd/layout';
// // import { CommonModule } from '@angular/common';
// // import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// // import { ReactiveFormsModule } from '@angular/forms';
// // import { AuthService } from '../../services/auth/auth.service';
// // import {NzMessageService} from "ng-zorro-antd/message"

// // import { Router } from '@angular/router';
// // @Component({
// //   standalone: true,
// //   selector: 'app-signup',
// //   imports: [ReactiveFormsModule, CommonModule, RouterModule, NzSpinModule, NzFormModule, NzButtonModule, NzInputModule, NzLayoutModule],
// //   templateUrl: './signup.component.html',
// //   styleUrl: './signup.component.css'
// // })
// // export class SignupComponent {
// //   isSpinning: boolean = false;

// //   signupForm !: FormGroup;

// //   constructor(private fb: FormBuilder , private authService:AuthService , private message:NzMessageService , private router: Router) { }
// //   ngOnInit() {
// //     this.signupForm = this.fb.group({
// //       name: [null, [Validators.required]],
// //       email: [null, [Validators.required, Validators.email]],
// //       password: [null, [Validators.required]],
// //       checkPassword: [null, [Validators.required, this.confirmationValidate]]
// //     })
// //   }

// //   confirmationValidate = (control: FormControl): { [s: string]: boolean } => {
// //     if (!control.value) {
// //       return { required: true };
// //     } else if (control.value !== this.signupForm.controls['password'].value) {
// //       return { confirm: true, error: true };
// //     }
// //     return {};
// //   };


// //   register() {
// //     console.log(this.signupForm.value);
// //     this.authService.register(this.signupForm.value).subscribe((res)=> {
// //       console.log(res);
// //       if(res.id != null){
// //         this.message.success("SignUp Successful!",{nzDuration:4000});
// //         this.router.navigateByUrl("/login");
// //       } else{
// //         this.message.error("Something went wrong. Please try again later!",{nzDuration :4000});
// //       }

// //     })
// //   }



// // }

// import { Component } from '@angular/core';
// import { RouterModule, Router } from '@angular/router';
// import { NzSpinModule } from 'ng-zorro-antd/spin';
// import { NzFormModule } from 'ng-zorro-antd/form';
// import { NzButtonModule } from 'ng-zorro-antd/button';
// import { NzInputModule } from 'ng-zorro-antd/input';
// import { NzLayoutModule } from 'ng-zorro-antd/layout';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';
// import { AuthService } from '../../services/auth/auth.service';
// import { NzMessageService } from 'ng-zorro-antd/message';

// @Component({
//   standalone: true,
//   selector: 'app-signup',
//   imports: [ReactiveFormsModule, CommonModule, RouterModule, NzSpinModule, NzFormModule, NzButtonModule, NzInputModule, NzLayoutModule],
//   templateUrl: './signup.component.html',
//   styleUrl: './signup.component.css'
// })
// export class SignupComponent {
//   isSpinning: boolean = false;
//   signupForm!: FormGroup;

//   constructor(private fb: FormBuilder, private authService: AuthService, private message: NzMessageService, private router: Router) {}

//   ngOnInit() {
//     this.signupForm = this.fb.group({
//       name: [null, [Validators.required]],
//       email: [null, [Validators.required, Validators.email]],
//       password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
//       checkPassword: [null, [Validators.required, this.confirmationValidate]]
//     });


//     this.signupForm.valueChanges.subscribe(value => {
//       console.log("Form Updated:", value);
//     });


//     this.signupForm.statusChanges.subscribe(status => {
//       console.log("Form Status Changed:", status);
//     });
//   }

//   confirmationValidate = (control: FormControl): { [s: string]: boolean } => {
//     if (!control.value) {
//       return { required: true };
//     } else if (control.value !== this.signupForm.controls['password'].value) {
//       return { confirm: true, error: true };
//     }
//     return {};
//   };

//   register() {
//     console.log("Register Button Clicked!");
//     console.log("Form Data Submitted:", this.signupForm.value); 

//     if (this.signupForm.invalid) {
//       console.warn("Form is Invalid! Please check the inputs.");
//       return;
//     }

//     this.isSpinning = true; 
//     this.authService.register(this.signupForm.value).subscribe(
//       (res) => {
//         console.log("API Response:", res); 
//         this.isSpinning = false; 

//         if (res.id != null) {
//           this.message.success("SignUp Successful!", { nzDuration: 4000 });
//           this.router.navigateByUrl("/login");
//         } else {
//           this.message.error("Something went wrong. Please try again later!", { nzDuration: 4000 });
//         }
//       },
//       (error) => {
//         this.isSpinning = false; 
//         console.error("Signup Failed:", error); 
//         this.message.error("Signup Failed! Please try again later.", { nzDuration: 4000 });
//       }
//     );
//   }
// }


import { NzSelectModule } from 'ng-zorro-antd/select';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StorageService } from '../../services/storage/storage.service';
import { MailOutline, LockOutline, UserOutline, PhoneOutline } from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';

@Component({
  standalone: true,
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    NzSpinModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzLayoutModule,
    HttpClientModule,
    NzSelectModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers: [
    { provide: NZ_ICONS, useValue: [MailOutline, LockOutline, UserOutline,PhoneOutline] }
  ]
})
export class SignupComponent {
  isSpinning: boolean = false;
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.trackFormChanges();
  }

  private initializeForm() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone : ['',[Validators.required, Validators.minLength(10)]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      checkPassword: ['', [Validators.required]],
      role: ['', [Validators.required]]  // Added role field
    }, { validator: this.passwordMatchValidator });
  }

  // Password Confirmation Validator
  private passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('checkPassword');

    if (!passwordControl || !confirmPasswordControl) return null;

    if (confirmPasswordControl.errors && !confirmPasswordControl.errors['mismatch']) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ mismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }

    return null;
  }

  // Track Form Changes
  private trackFormChanges() {
    this.signupForm.valueChanges.subscribe(value => {
      console.log("Form Updated:", value);
    });

    this.signupForm.statusChanges.subscribe(status => {
      console.log("Form Status Changed:", status);
    });
  }

  // Register Method
  register() {
    console.log("Register Button Clicked!");

    if (this.signupForm.invalid) {
      console.warn("Form is Invalid! Please check the inputs.");
      Object.values(this.signupForm.controls).forEach(control => {
        control.markAsTouched();
        control.updateValueAndValidity();
      });
      return;
    }

    this.isSpinning = true;

    this.authService.register(this.signupForm.value).subscribe({
      next: (res) => {
        this.isSpinning = false;
        console.log("API Response:", res);

        if (res?.user?.email) {
          this.storageService.saveUserDetails(this.signupForm.value); //Save details
          this.message.success("SignUp Successful!", { nzDuration: 4000 });

          console.log("Navigating to Login Page...");
          this.router.navigate(['/login']).then(navigated => {
            console.log(navigated ? "Navigation successful." : "Navigation failed!");
          });
        } else {
          console.error("Signup failed: Unexpected response format", res);
          this.message.error("Signup failed! Please try again.", { nzDuration: 4000 });
        }
      },
      error: (error) => {
        this.isSpinning = false;
        console.error("Signup Failed: API Error", error);

        const errorMessage = error?.error?.message || "Signup Failed! Please try again later.";
        this.message.error(errorMessage, { nzDuration: 4000 });
      }
    });
  }


}
