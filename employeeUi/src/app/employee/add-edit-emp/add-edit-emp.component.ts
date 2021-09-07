import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  @Input() emp: any;
  EmployeeId:string="";
  EmployeeName:string="";
  Department:string = "";
  DateOfJoin:string ="";
  PhotoFileName:string = "";
  PhotoFilePath:string="";

  DepartmentList: any = []

  constructor(private service: SharedService) { }

      ngOnInit(): void {

        this.loadDepartmentList();
      }
      loadDepartmentList(){
        this.service.getAllDepartmentNames().subscribe((data:any)=>{
          this.DepartmentList = data;

          this.EmployeeId = this.emp.EmployeeId;
          this.EmployeeName = this.emp.EmployeeName;
          this.Department = this.emp.Department;
          this.DateOfJoin = this.emp.DateOfJoin;
          this.PhotoFileName = this.emp.PhotoFileName;
          this.PhotoFilePath = this.service.PhotoUrl+this.PhotoFileName;
        })
      }
      addEmployee(){
        var val = {
          EmployeeId: this.emp.EmployeeId,
          EmployeeName: this.emp.EmployeeName,
          Department: this.emp.Department,
          DateOfJoin:  this.emp.DateOfJoin,
          PhotoFileName: this.emp.PhotoFileName
        };
        this.service.addEmployee(val).subscribe(res=>{
          alert(res.toString());
        });
      }
      updateEmployee(){
        var val = {
          EmployeeId: this.emp.EmployeeId,
          EmployeeName: this.emp.EmployeeName,
          Department: this.emp.Department,
          DateOfJoin:  this.emp.DateOfJoin,
          PhotoFileName: this.emp.PhotoFileName
        };
          this.service.updateEmployee(val).subscribe(res=>{
          alert(res.toString());
        })
      }
      uploadPhoto(event:Event){
        const target = event.target as HTMLInputElement;
        var file = target.files as FileList;
        console.log(file[0])
        const formData:FormData = new FormData();
        formData.append('UploadFile',file[0],file[0].name);

        this.service.UploadPhoto(formData).subscribe((data:any)=>{
          this.PhotoFileName = data;
          this.PhotoFilePath = this.service.PhotoUrl+this.PhotoFileName;
        })
      }

}
