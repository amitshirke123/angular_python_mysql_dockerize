import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TableDataService } from 'src/app/services/table-data.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddEditModalComponent } from './add-edit-modal/add-edit-modal.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent implements OnInit {

  public displayedColumns = ['id', 'city', 'start_date', 'end_date', 'price', 'status', 'color', 'action'];
  public dataSource = new MatTableDataSource;
  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  @ViewChild('sort', { static: false }) sort: MatSort;
  loader = false;

  constructor(private tableService: TableDataService, private matDialog: MatDialog) { }

  ngOnInit() {
    this.retrieveData();
  }


  retrieveData(): void {
    this.loader = true;
    this.tableService.getAll()
      .subscribe(
        data => {
          this.loader = false;
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error => {
          console.log(error);
          this.loader = false;
        });
  }


  deleteData(product): void {
    this.loader = true;
    this.tableService.delete(product.id)
      .subscribe(
        response => {
          this.loader = false;
          this.retrieveData();
        },
        error => {
          console.log(error);
          this.loader = false;
        });
  }



  openAddEditModal(action, element) {

    const dialogConfig = new MatDialogConfig();
    if (action === 'View/Edit') {
      dialogConfig.data = {
        'formData': element,
        'action': action
      };
    } else if (action == 'Add') {
      dialogConfig.data = {
        'action': action
      };
    }
    const dialogRef = this.matDialog.open(AddEditModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      this.retrieveData();
    });

  }



}
