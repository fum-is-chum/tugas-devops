import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[autoFocus]'
})
export class AutoFocusDirective {

  constructor(private host: ElementRef) { }

  ngOnInit() {
    setTimeout(() => {
      this.host.nativeElement.focus();
    })
  }

}
