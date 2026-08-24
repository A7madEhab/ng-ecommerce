import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedinGuard: CanActivateFn = (route, state) => {
  if(typeof(localStorage)!=='undefined'){

    const _router = inject(Router)
    if(localStorage.getItem('userToken')!==null){
      _router.navigate(['/home'])
      return false;
    }
    return true;
  }
  return false;
};
