import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {

  message:any;

  constructor(private dialogRef: MatDialogRef<AlertMessageComponent>,
              @Inject(MAT_DIALOG_DATA) public alertData:any
             ) { }

  ngOnInit(): void {
    if(this.alertData){
      this.message = this.alertData;
      console.log(JSON.stringify(this.message) + "hhhhh");
    }
  }

  delete(){
    this.dialogRef.close('delete');
  }

}
