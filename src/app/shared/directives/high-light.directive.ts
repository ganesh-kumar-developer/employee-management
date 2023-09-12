import { Directive, ElementRef, AfterViewInit, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighLight]'
})
export class HighLightDirective implements OnChanges, AfterViewInit {

  @Input() searchKey: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(): void {
    if (this.searchKey) {
      this.highlightText(this.searchKey);
    } else {
      this.removeHighlight();
    }
  }

  ngAfterViewInit() {
    if (this.searchKey) {
      this.highlightText(this.searchKey);
    } else {
      this.removeHighlight();
    }
  }

  private highlightText(search: string) {
    const content = this.el.nativeElement.textContent;
    const index = content.toLowerCase().indexOf(search.toLowerCase());

    if (index !== -1) {
      const before = content.slice(0, index);
      const match = content.slice(index, index + search.length);
      const after = content.slice(index + search.length);

      const markedText = document.createElement('mark');
      markedText.textContent = match;

      const fragment = document.createDocumentFragment();
      fragment.appendChild(document.createTextNode(before));
      fragment.appendChild(markedText);
      fragment.appendChild(document.createTextNode(after));

      this.el.nativeElement.innerHTML = ''; // Clear the element
      this.el.nativeElement.appendChild(fragment);
    } else {
      this.removeHighlight();
    }
  }

  private removeHighlight() {
    const markElements = this.el.nativeElement.querySelectorAll('mark');
    markElements.forEach((markElement: any) => {
      const parent = markElement.parentNode;
      while (markElement.firstChild) {
        parent.insertBefore(markElement.firstChild, markElement);
      }
      parent.removeChild(markElement);
    });
  }
}