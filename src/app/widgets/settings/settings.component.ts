import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  asc = true // Sort by ascending ids
  desc = false //  Sort by descending ids
  pages: number [] = [];  
  activePage: number;
  recordsPerPage = 10;

  // Inputs
  @Input() totalRecords = 0;
  @Input() hide = false;

  // Emitters for pagination and sorting
  @Output() onPageChange: EventEmitter<number> = new EventEmitter();
  @Output() onSortChange: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): any {  
    // On changes, check page count, page array and return to 1st page. Emit that 1st page is being activated
    const pageCount = this.getPageCount();  
    this.pages = this.getArrayOfPage(pageCount);  
    this.activePage = 1;  
    this.onPageChange.emit(1);
  }  

  private  getPageCount(): number {  
    let totalPage = 0;  
    // Divide total number of records by records per page to get number of pages
    if (this.totalRecords > 0 && this.recordsPerPage > 0) {  
      const pageCount = this.totalRecords / this.recordsPerPage;  
      const roundedPageCount = Math.floor(pageCount);  
      //Round 1 UP if exeed limit 
      totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;  
    }  

    return totalPage;  
  }  

  private getArrayOfPage(pageCount: number): number [] {  
    const pageArray = [];  

    if (pageCount > 0) {  
        for(let i = 1 ; i <= pageCount ; i++) {  
          pageArray.push(i);  
        }  
    }  

    return pageArray;  
  }

  onClickPage(pageNumber: number): void {  
    // Check if next or prev is possible, then emit the change
    if (pageNumber >= 1 && pageNumber <= this.pages.length) {  
        this.activePage = pageNumber;  
        this.onPageChange.emit(this.activePage);  
    }  
} 


  sortBy(asc) {

    this.asc = asc
    this.desc = !asc

    // Emmit sorting to parent
    
    this.onSortChange.emit(asc);

  }

}
