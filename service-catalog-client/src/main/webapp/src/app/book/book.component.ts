import { Component, OnInit } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { BookService } from './book.service';

@Component({
    selector: 'ngx-book',
    templateUrl: './book.component.html',
    styleUrls: ['book.component.css'],
    providers: [
        BookService
    ]
})
export class BookComponent implements OnInit {
    enableButton = true;
    items: TreeviewItem[];
    values: number[];
    config: TreeviewConfig = {
        hasAllCheckBox: true,
        hasFilter: true,
        hasCollapseExpand: true,
        maxHeight: 500,
      decoupleChildFromParent:false,
      hasDivider:true
    };

    constructor(
        private service: BookService
    ) { }

    ngOnInit() {
        debugger;
        this.items = this.service.getBooks();
      //  console.log(this.items);
    }
}
