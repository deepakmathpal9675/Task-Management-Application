import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appBlockCopy]'
})
export class BlockCopyDirective {
  constructor() { }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    e.preventDefault();
  }
}