import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  @Input() users = []
  @Output() onFilterChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  // get dummie photo
  getSrc(id : number): string{
    return `../../../assets/img/dummies/image-placeholder-${id}.png`
  }

  // filter feed
  filterByUserId(id: number){
    this.onFilterChange.emit(id);  
  }


}
