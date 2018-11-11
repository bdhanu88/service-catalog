import { Component } from '@angular/core';

@Component({
    selector: 'app-basictree',
    templateUrl: './basictree.component.html',
    //styleUrls: ['book.component.css'],

    styles: []
})
export class BasicTreeComponent {
    nodes = [
        {
            name: 'root1',
            children: [
                { name: 'child1', id: 1 },
                { name: 'child2', id: 2 }
            ]
        },
        {
            name: 'root2',
            children: [
                { name: 'child3', id: 3 },
                { name: 'child4', id: 4 }
            ]
        },
        { name: 'root3' },

        { name: 'root5', children: null }
    ];

    treeclickEvent(event) {
        debugger;
        if (event.node.isLeaf) {
            var r = event.node.data.id;
            console.log(r);

        }



    }


}