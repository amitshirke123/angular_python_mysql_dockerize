import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableDataService } from 'src/app/services/table-data.service';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.css']
})
export class AddEditModalComponent implements OnInit {

  itemDetailsForm: FormGroup;
  loader = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddEditModalComponent>,
    private tableService: TableDataService, private matDialog: MatDialog, private fb: FormBuilder) {
    this.dialogRef.updateSize('50%');


  }

  ngOnInit() {
    this.itemDetailsForm = this.fb.group({
      city: ['', Validators.required],
      price: ['', Validators.required],
      status: ['', Validators.required],
      color: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });

    if (this.data.action === 'View/Edit') {
      this.setData();
    }
  }


  setData() {
    this.itemDetailsForm.patchValue({
      'city': this.data.formData.city,
      'price': this.data.formData.price,
      'status': this.data.formData.status,
      'color': this.data.formData.color,
      'start_date': this.data.formData.start_date,
      'end_date': this.data.formData.end_date
    })
  }


  saveData(): void {
    this.loader = true;
    const data = {
      city: this.itemDetailsForm.controls.city.value,
      price: this.itemDetailsForm.controls.price.value,
      status: this.itemDetailsForm.controls.status.value,
      color: this.itemDetailsForm.controls.color.value,
      start_date: this.itemDetailsForm.controls.start_date.value,
      end_date: this.itemDetailsForm.controls.end_date.value,
    };

    this.tableService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.loader = false;
          this.dialogRef.close()
        },
        error => {
          this.loader = false;
          console.log(error);
        });
  }


  updateData(): void {
    this.loader = true;
    const data = {
      city: this.itemDetailsForm.controls.city.value,
      price: this.itemDetailsForm.controls.price.value,
      status: this.itemDetailsForm.controls.status.value,
      color: this.itemDetailsForm.controls.color.value,
      start_date: '2012-3-23',
      end_date: '2013-4-12'
    };

    this.tableService.update(this.data.formData.id,data)
      .subscribe(
        response => {
          console.log(response);
          this.loader = false;
          this.dialogRef.close()
        },
        error => {
          this.loader = false;
          console.log(error);
        });
  }  

  close(){
    this.dialogRef.close();
  }


}
