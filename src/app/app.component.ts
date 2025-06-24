import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { StorageService } from './auth/services/storage/storage.service';
import { CommonModule } from '@angular/common';
import { NzIconModule , NZ_ICONS} from 'ng-zorro-antd/icon';
import { UserAddOutline, UserOutline } from '@ant-design/icons-angular/icons';
import { Car } from './modules/admin/services/car.model';
import { CarService } from './modules/admin/services/car.service';
import { AuthService } from './auth/services/auth/auth.service';
const icons = [UserAddOutline, UserOutline];

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [NzIconModule, CommonModule, RouterModule, NzSpinModule, NzFormModule, NzButtonModule, NzInputModule, NzLayoutModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [{ provide: NZ_ICONS, useValue: icons }] 
})
// export class AppComponent {
//   title = 'car_rental_angular';
//   cars: Car[] = [];
//   isCustomerLoggedIn: boolean = false;
//   isAdminLoggedIn: boolean = false;
  

//   constructor(private router: Router, private storageService: StorageService,private carService: CarService,private authService: AuthService) { }

//   ngOnInit() {
//     this.isCustomerLoggedIn = this.storageService.isCustomerLoggedIn();
//     this.isAdminLoggedIn = this.storageService.isAdminLoggedIn();
  

//     if (this.isAdminLoggedIn) {
//       this.isCustomerLoggedIn = false;
//     }

//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//         this.isCustomerLoggedIn = this.storageService.isCustomerLoggedIn();
//         this.isAdminLoggedIn = this.storageService.isAdminLoggedIn();

//         if (this.isAdminLoggedIn) {
//           this.isCustomerLoggedIn = false;
//         }
//       }
//     });
//   }

//   logout() {
//     this.storageService.logout();
//     this.router.navigateByUrl("/login");
//   }

// }


export class AppComponent {
  title = 'car_rental_angular';
  isCustomerLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;
  userName: string = 'User'; // Default value

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.checkLoginStatus();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkLoginStatus();
      }
    });
  }

  checkLoginStatus() {
    this.isCustomerLoggedIn = this.storageService.isCustomerLoggedIn();
    this.isAdminLoggedIn = this.storageService.isAdminLoggedIn();

    if (this.isAdminLoggedIn) {
      this.isCustomerLoggedIn = false;
    }

    this.userName = this.storageService.getUserName(); // Fetch username
  }

  logout() {
    this.storageService.logout();
    this.userName = 'User'; // Reset name
    this.router.navigateByUrl("/login");
  }
}
