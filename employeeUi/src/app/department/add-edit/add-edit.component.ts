import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

      @Input() dep: any;
      DepartmentId:string="";
      DepartmentName:string="";
      constructor(private service: SharedService) { }

      ngOnInit(): void {
        this.DepartmentId = this.dep.DepartmentId;
        this.DepartmentName = this.dep.DepartmentName;
      }
      addDepartment(){
        var val = {DepartmentId:this.DepartmentId,
                    DepartmentName:this.DepartmentName};
        this.service.addDepartment(val).subscribe(res=>{
          alert(res.toString());
        });
      }
      updateDepartment(){
        var val = {DepartmentId:this.DepartmentId,
          DepartmentName:this.DepartmentName};
          this.service.updateDepartment(val).subscribe(res=>{
          alert(res.toString());
    })
  }
}
