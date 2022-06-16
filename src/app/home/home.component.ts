import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogModalComponent } from '../components/dialog-modal/dialog-modal.component';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { AlertMessageComponent } from '../components/alert-message/alert-message.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['name', 'idno', 'year', 'dateOfBirth', 'branch', 'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  constructor(public dialog:MatDialog,
              private api:ApiService,
              ) { }

  ngOnInit(): void {
      this.getStudentDetails();
  }

  openDialog() {
    this.dialog.open(DialogModalComponent, {
      width: '60%'
    }).afterClosed().subscribe(val => {
      if(val == 'save'){
        this.getStudentDetails();
      }
    });
  }

  openAlertToDelete(row:any){
    this.dialog.open(AlertMessageComponent,{
      width: '50%',
      data:[{
        'text' : 'Do you want to remove this record!',
        'btn1' : 'close',
        'btn2' : 'delete'
      }]
    }).afterClosed().subscribe(val=>{
      if(val == 'delete'){
        this.deleteRow(row);
      }
    })
  }

  editDialog(row:any) {
    this.dialog.open(DialogModalComponent, {
      width: '60%',
      data:row
    }).afterClosed().subscribe(val => {
      if(val == 'update'){
        this.getStudentDetails();
      }
    });
  }

  deleteRow(row_id:any){
    this.api.deleteStudent('/students/'+row_id).
    subscribe({
      next:(res) => {
          this.getStudentDetails();
      },
      error:()=>{
        console.log("Error to delete the row");
      }
    })
  }
 
  getStudentDetails(){
    this.api.getStudent('/students')
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // console.log(JSON.stringify(res) + "aaa");
      },
      error:()=>{
        console.log("error while fetching the data");
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
