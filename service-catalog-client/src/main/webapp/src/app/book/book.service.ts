import { Injectable } from '@angular/core';
import { TreeviewItem } from 'ngx-treeview';

export class BookService {



    getBooks(): TreeviewItem[] {

        
        const childrenCategory = new TreeviewItem({
            text: 'Children', value: 1 , children: [
                { text: 'Baby 3-5', value: 11 ,checked: false  },
                { text: 'Baby 9-12', value: 13, checked: false }
            ]
        });
        const itCategory = new TreeviewItem({
            text: 'IT', value: 9,  children: [
                {
                    text: 'Programming', value: 91 , disabled: true
                },
                {
                    text: 'Networking', value: 92 ,checked: false
                }
            ]
        });


        return [childrenCategory, itCategory];
    }
}
