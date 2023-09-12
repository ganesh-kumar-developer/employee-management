import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() total: number = 0;
  @Input() limit: number = 10;
  @Output() pages: number[] = [];
  @Output() pageChangeEvent = new EventEmitter<any>();

  currentPage: number = 1;
  totalPage: number = 0;
  displayRecordFrom: number = 0;
  displayRecordTo: number = 0;
  pageChangeEventData: paginationEventData = { }

  constructor() { }

  ngOnInit(): void {
    this.totalPage = Math.ceil(this.total / this.limit);
    this.preparePages();
    this.updateDisplayRecordRange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['total']) {
      let total = changes['total'];
      if (typeof total?.currentValue === 'number') {
        this.totalPage = Math.ceil(total.currentValue / this.limit);
        this.changePage(1);
        this.preparePages();
      }
    }
  }

  preparePages(): void {
    this.pages = [...Array(this.totalPage).keys()].map((page) => page + this.currentPage);
  }

  changePage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.updateDisplayRecordRange();
    this.setPageEventData();
  }

  setPageEventData() {
    this.pageChangeEventData.displayRecordFrom = this.displayRecordFrom;
    this.pageChangeEventData.displayRecordTo = this.displayRecordTo;
    this.pageChangeEventData.currentPage = this.currentPage;
    this.pageChangeEvent.emit(this.pageChangeEventData);
  }

  updateDisplayRecordRange() {
    this.displayRecordFrom = (this.currentPage * this.limit) - this.limit;
    this.displayRecordTo = ((this.currentPage * this.limit) < this.total) ? (this.currentPage * this.limit) : this.total;
  }

  goNext() {
    if (this.currentPage < this.totalPage)
      this.changePage(this.currentPage + 1);
  }
  goBack() {
    if (this.currentPage > 1)
      this.changePage(this.currentPage - 1);
  }
}

interface paginationEventData {
  displayRecordFrom?: number,
  displayRecordTo?: number,
  currentPage?: number,
  total? : number,
  limit?: number
}