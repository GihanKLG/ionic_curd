//student-list.page.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from './../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
})
export class StudentListPage implements OnInit {

  studentsData: any;

  constructor(public apiService: ApiService, private authService: AuthenticationService, public router: Router) {
    this.studentsData = [];
  }

  ngOnInit() {
    this.getAllStudents();
  }

  getAllStudents() {
    //Get saved list of students
    this.apiService.getList().subscribe(response => {
      console.log(response);
      this.studentsData = response;
    })
  }


  delete(item) {
    //Delete item in Student data
    this.apiService.deleteItem(item.id).subscribe(Response => {
      //Update list after delete is successful
      this.getAllStudents();
    });
  }

  logout() {
    console.log("logout");
    this.authService.logout();
    this.authService.authenticationState.subscribe(state => {
      console.log(state);
      if (state) {
        this.router.navigate(['list']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }
}
