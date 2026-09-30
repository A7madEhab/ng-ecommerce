import { HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  if (localStorage.getItem('userToken') !== null) {
    req = req.clone({
      setHeaders: {
        token: localStorage.getItem('userToken')!,
      },
    });
  }
  return next(req);
};
