import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector:'[basichighlight]'
})
export class HighlightDirective implements OnInit{
  constructor(private eleRef:ElementRef) {
  }
  ngOnInit() {
    this.eleRef.nativeElement.style.backgroundColor='red';
  }
}

