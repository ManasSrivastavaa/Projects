
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn:boolean=false
  setValue(data:boolean):void{
     this.isLoggedIn=data;
  }
  constructor(private http:HttpClient) { }
  RegisterUser(form: FormGroup){
    const user = {
      name : form.get("name")?.value,
      email : form.get("email")?.value,
      password:form.get("password")?.value,
    }
    console.log(user)
    return this.http.post<any>("http://localhost:8082/add",user);
  }
  getAllUser(){
    return this.http.get<any>("http://localhost:8082/users");
  }
}
