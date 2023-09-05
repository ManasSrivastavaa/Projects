import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-and-register',
  templateUrl: './login-and-register.component.html',
  styleUrls: ['./login-and-register.component.css'],
})
export class LoginAndRegisterComponent implements OnInit {
  constructor(private service: LoginService, private router: Router) {}
  isNotLoggedIn:boolean=true
  ngOnInit(): void {
    this.service.getAllUser().subscribe((data) => {
      this.users = data;
      this.loginForm.value.email = '';
      this.loginForm.value.password = '';
    });
  }
  users: any[] = [];
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  validateUser(users: any, form: FormGroup) {
    console.log(users);
    if(users!=null){
    for (let user of users) {
      console.log(user);
      if (form.value.email === user.email) {
        if (user.password === form.value.password) {
          localStorage.setItem('isLoggedIn',"true")
          return true;
        }
         else {
          return false;
        }
      }
      else {
        return 'NotRegistered';
      }
    }
  }
  else{
    return 'error';
  }
  return 'oops'
  }
  getValueLoginForm() {
    console.log(this.loginForm.value);
    if (this.loginForm.value.email && this.loginForm.value.password) {
      this.service.getAllUser().subscribe((data) => {
        this.users = data;
        this.validateUser(this.users, this.loginForm);
      });
      if (this.validateUser(this.users, this.loginForm)==true) {
        alert('successfully logged in');
        this.isNotLoggedIn=false;
        this.service.setValue(true)
        this.router.navigate(['home']);
      }
      else if (this.validateUser(this.users, this.loginForm) === 'NotRegistered')
      {
        alert('you are not registered');
      }
      else if (this.validateUser(this.users, this.loginForm) === 'error')
      {
        alert('There is an error in validation trying to login again');
      }
      else if (this.validateUser(this.users, this.loginForm) === 'oops')
      {
        alert('something went wrong');
      }
      else {
        alert('wrong password');
      }
    } else {
      alert('please fill all the fields');
    }
  }
}
