import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {
  DepartmentList:any =[];
  modalTitle:string = "";
  activateAddEditComp:boolean = false;
  dep:any;

  DepartmentIdFilter: string = "";
  DepartmentNameFilter: string = "";
  DepartmentListWithoutFilter: any = [];
  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.refreshDepartment();
  }
  addClick(){
    this.dep = {
      DepartmentId:0,
      DepartmentName:""
    }
    this.modalTitle = "Add Department";
    this.activateAddEditComp = true;
  }
  closeClick(){
    this.activateAddEditComp = false;
    this.refreshDepartment();
  }
  editClick(item:any){
    this.dep = item;
    this.modalTitle = "Edit Department";
    this.activateAddEditComp = true;
  }
  deleteClick(item:any){
    if(confirm("Are you sure?")){
      this.service.deleteDepartment(item.DepartmentId).subscribe(data =>{
        alert(data.toString());
        this.refreshDepartment();
      })
    }
  }

  refreshDepartment(){
    this.service.getDepList().subscribe(data =>{
      this.DepartmentList = data;

      this.DepartmentListWithoutFilter = data;
    })
  }
  filterFn(){
    var departmentIdFilter = this.DepartmentIdFilter;
    var departmentNameFilter = this.DepartmentNameFilter;

    this.DepartmentList = this.DepartmentListWithoutFilter.filter(function(el:any){
      return el.DepartmentId.toString().toLowerCase().includes(
        departmentIdFilter.toString().trim().toLowerCase()
      )&&
      el.DepartmentName.toString().toLowerCase().includes(
        departmentNameFilter.toString().trim().toLowerCase()
      );
    });
  }
  sortResult(prop:any,asc:boolean){
    this.DepartmentList = this.DepartmentListWithoutFilter.sort(function(a:any,b:any){
      if(asc){
        return (a[prop]>b[prop])? 1 : ((a[prop]<b[prop])? -1:0);
      }
      else{
        return (b[prop]>a[prop])? 1 : ((b[prop]<a[prop])? -1:0);
      }
    })
  }
}
