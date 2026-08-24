import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if(typeof localStorage !== 'undefined'){

    const _router = inject(Router)
    if(localStorage.getItem('userToken')!==null){
      return true;
    }
    _router.navigate(['/login']);
    return false;
  };
    return false;
}
