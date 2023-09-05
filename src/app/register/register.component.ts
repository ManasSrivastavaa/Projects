import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user:any
  constructor(private service: LoginService,private router :Router){}
  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  getValueRegistrationForm() {
    console.log(this.registrationForm.value);
    if (this.registrationForm.value.email && this.registrationForm.value.password && this.registrationForm.value.name)
    {
      this.user=this.service.RegisterUser(this.registrationForm).subscribe()
      if (this.user!=null) {
        this.registrationForm.value.email = '';
        this.registrationForm.value.password = '';
        this.registrationForm.value.name = '';
        alert('successfully registered');
        this.showLoginSection()
      }
      else {
        alert('failed to register');
      }
    }
    else {
      alert('please fill all the fields');
    }
  }
  showLoginSection(){
   this.router.navigate(['']);
  }
}
