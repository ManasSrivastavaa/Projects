import { AfterViewInit, Component, EventEmitter, Input,OnInit,Output } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../service/property.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements AfterViewInit {
  constructor(private router:Router,public service:PropertyService){
  }
  isChatEnabled:Boolean=false
  ngAfterViewInit(): void {
    this.service.getAllProperties().subscribe(()=>
    {
this.service.ExtractProperty()
this.isChatEnabled=this.service.isEnabbled
console.log(this.isChatEnabled,this.service.isEnabbled);

    }
    )
  }
  @Output() showChatEvent = new EventEmitter();
  @Input()  isNotLoggedIn:boolean = true;
  showChat:boolean=true
showAdminPanel(){
  this.router.navigate(['/admin']);
}
showChatWidget(){
this.showChatEvent.emit()
}
}
