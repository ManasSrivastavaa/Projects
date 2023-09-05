import { CanActivateFn } from '@angular/router';
var isLoggedIn=localStorage.getItem('isLoggedIn')
export const authGuard: CanActivateFn = (route, state) => {
   isLoggedIn=localStorage.getItem('isLoggedIn')
  // if(isLoggedIn=="true"){
  //   return true;
  // }
  // else{
  //   return false;
  // }
  return true;
};

