import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {
  EmployeeList:any =[];
  modalTitle:string = "";
  activateAddEditEmpComp:boolean = false;
  emp:any;
  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.refreshEmployee();
  }
  addClick(){
    this.emp = {
      EmployeeId:0,
      EmployeeName:"",
      Department:"",
      DateOfJoin:"",
      PhotoFileName:"anonymus.png"
    }
    this.modalTitle = "Add Employee";
    this.activateAddEditEmpComp = true;
  }
  closeClick(){
    this.activateAddEditEmpComp = false;
    this.refreshEmployee();
  }
  editClick(item:any){
    this.emp = item;
    this.modalTitle = "Edit Employee";
    this.activateAddEditEmpComp = true;
  }
  deleteClick(item:any){
    if(confirm("Are you sure?")){
      this.service.deleteDepartment(item.EmployeeId).subscribe(data =>{
        alert(data.toString());
        this.refreshEmployee();
      })
    }
  }

  refreshEmployee(){
    this.service.getEmployeet().subscribe(data =>{
      this.EmployeeList = data;
    })
  }

}
