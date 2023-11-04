import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addApiUrl(req));
  }

  addApiUrl(req: HttpRequest<any>, apiUrl: string = environment.apiUrl) {
    return req.clone({
      url: apiUrl + req.url,
    });
  }
}
