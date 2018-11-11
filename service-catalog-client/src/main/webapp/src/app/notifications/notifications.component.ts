import { Component , ViewChild } from '@angular/core';
import { NotificationActionRendererComponent } from '../shared/render-component/notification-action-renderer.component';
import { CheckBoxRendererComponent } from '../shared/render-component/checkbox-renderer.component';
import { AgGridTableCustomComponent } from '../shared/ag-grid/table/table.component';

@Component({
    selector: 'notifications-cmp',
    moduleId: module.id,
    templateUrl: 'notifications.component.html'
})

export class NotificationsComponent {
    
    @ViewChild('notificationTable') notificationTableComponent;
    
    @ViewChild('incomingMessageTable') incomingMessageTableComponent;
    
    @ViewChild('sentMessageTable') sentMessageTableComponent;
    
    constructor() {}

    ngOnInit() {
       let columnDefs = [
            {
                headerName: "",
                cellRendererFramework: CheckBoxRendererComponent,
                width: 30,
                //headerCheckboxSelection: true,
                //headerCheckboxSelectionFilteredOnly: true,
            },
            {
                headerName: "From",
                field: "sender",
                width: 80
            },
            {
                headerName: "Subject",
                field: "subject",
                width: 220
            },
            {
                headerName: "Received",
                field: "receviedTime",
                width: 40
            },
            {
                headerName: "Action",
                cellRendererFramework: NotificationActionRendererComponent,
                width: 40
            },

        ];
        let rowData = [
       
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer' , receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer', receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',    subject: 'Waste Collection',  receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer', receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Moving Equipment',  receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Deceased Patient',  receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer',  receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer',  receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer',  receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer',  receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer',  receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer',  receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer',  receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer',  receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer',  receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer',  receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer',  receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer',  receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer',  receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer',  receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer', receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer',  receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer', receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer',  receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer',  receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer',  receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer',  receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer',  receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer',  receviedTime:' 12:45:02'},
            { sender :   ' OP D -6-23-145',     subject: 'Patient Transfer',  receviedTime:' 12:45:02'}
        ]
        
        this.notificationTableComponent.setColumnDef(columnDefs);
        this.notificationTableComponent.setData(rowData);
        
        this.incomingMessageTableComponent.setColumnDef(columnDefs);
        this.incomingMessageTableComponent.setData(rowData);
        
        this.sentMessageTableComponent.setColumnDef(columnDefs);
        this.sentMessageTableComponent.setData(rowData);
    }
    
    refreshTable(component:string){
        if(component === 'notificationTable'){
            this.notificationTableComponent.refreshTableView();
        }else if(component === 'incomingMessageTable'){
            this.incomingMessageTableComponent.refreshTableView();
        } else if(component === 'sentMessageTable'){
            this.sentMessageTableComponent.refreshTableView();
        }
    }
}
