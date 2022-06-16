import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.scss']
})
export class DialogModalComponent implements OnInit {

  branches = ['CSE','ECE','MECH','CIVIL','CHEM','MME'];
  studentForm !:FormGroup;
  actionType = 'Submit';
  constructor(private formBuilder:FormBuilder,
              public api:ApiService,
              @Inject(MAT_DIALOG_DATA) public editData:any,
              private dialogRef:MatDialogRef<DialogModalComponent>
              ) { }

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      name : ['',Validators.required],
      idno : ['',Validators.required],
      year : ['',Validators.required],
      dateOfBirth : ['',Validators.required],
      branch : ['',Validators.required]
    });

    if(this.editData){
      console.log(JSON.stringify(this.editData) + "aaa");
      this.studentForm.controls['name'].setValue(this.editData.name);
      this.studentForm.controls['idno'].setValue(this.editData.idno);
      this.studentForm.controls['year'].setValue(this.editData.year);
      this.studentForm.controls['dateOfBirth'].setValue(this.editData.dateOfBirth);
      this.studentForm.controls['branch'].setValue(this.editData.branch);
      this.actionType = 'Update'
    }
  }

  addStudent(){
    if(!this.editData){
      if(this.studentForm.valid){
        this.api.postStudent('/',this.studentForm.value)
        .subscribe({
          next:(res)=>{
            this.studentForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            console.log("error occured while adding data");
          }
        })
      }
    }else{
      this.updateStudent();
    }
  }

  updateStudent(){
      this.api.updateStudent('/students/'+this.editData._id,this.studentForm.value)
      .subscribe({
        next:(res)=>{
          this.studentForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert('fail');
          console.log("error occured while updating data");
        }
      })
  }

}
