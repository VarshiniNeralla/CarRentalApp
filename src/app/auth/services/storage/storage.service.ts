
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageKey = 'signupDetails';
  private readonly ADMIN_ROLE = 'admin';

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  // saveUserDetails(userData: any): void {
  //   if (isPlatformBrowser(this.platformId) && userData) {
  //     localStorage.setItem(this.storageKey, JSON.stringify(userData));
  //     console.log("User details saved in local storage:", userData);
  //   }
  // }

  saveUserDetails(userData: any): void {
    if (isPlatformBrowser(this.platformId) && userData) {
      localStorage.setItem(this.storageKey, JSON.stringify(userData));
      localStorage.setItem('userName', userData.name);
      console.log("User details saved in local storage:", userData);
    }
  }

  getUserDetails(): any {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    }
    return null;
  }
  getUserName(): string {
    if (isPlatformBrowser(this.platformId)) {
      const user = this.getUserDetails();
      return user?.name || 'User'; // Default to 'User' if name is missing
    }
    return 'User';
  }
  

  clearUserDetails(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.storageKey);
      console.log("User details removed from local storage");
    }
  }

  // isCustomerLoggedIn(): boolean {
  //   const user = this.getUserDetails();
  //   return !!user && (!user.role || user.role !== this.ADMIN_ROLE);
  // }
  isCustomerLoggedIn(): boolean {
    const user = this.getUserDetails();
    return !!user && user.role === 'customer'; 
  }
  

  isAdminLoggedIn(): boolean {
    const user = this.getUserDetails();
    return !!user && user.role === this.ADMIN_ROLE;
  }

  // logout(): void {
  //   if (isPlatformBrowser(this.platformId)) {
  //     localStorage.removeItem(this.storageKey);
  //     console.log("User has been logged out.");
  //   }
  // }
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.storageKey);
      localStorage.removeItem('userName'); // Remove username
      console.log("User has been logged out.");
    }
  }
  
}
