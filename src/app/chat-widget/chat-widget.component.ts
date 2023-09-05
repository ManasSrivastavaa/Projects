import { Component, EventEmitter, Output,OnInit, Input, HostListener } from '@angular/core';
import { PropertyService } from '../service/property.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css']
})
export class ChatWidgetComponent implements OnInit  {
  showMinBottonofShowChat:boolean=true
  constructor(public service:PropertyService,private sanitizer:DomSanitizer){
    this.service.getAllProperties().subscribe(()=>{
      this.IframeURL=this.service.IframeUrl
       this.IframeSafeURL=this.sanitizer.bypassSecurityTrustResourceUrl(this.IframeURL)
    })
  }
  @HostListener('window:message', ['$event'])
  onPostMessage(event: MessageEvent) {
    const receivedData = event.data;
    console.log("ChatComponent", receivedData);
  }
  ngOnInit(): void {
    this.showMinBottonofShowChat=false
   this.isIframeHidden=true;
   this.isNavHidden=false
   this.showMaxBotton=true;
  this.showMinBotton=false;
  }

  @Input() fontColor:string=""
  @Input() fontSize:number=0
  @Input() fontFamily:string=''
  @Input() fontText:string=''
  @Input() navColor:string="white"
  @Input() navHeight:number=40;
  showMaxBotton:boolean=true;
  showMinBotton:boolean=false;
  isIframeHidden:boolean= true;
  isNavHidden:boolean = true;
  IframeURL:string=""
  IframeSafeURL:SafeResourceUrl=''
  @Output() hideNavEvent=new EventEmitter();
  @Output() resizeEvent=new EventEmitter();
  @Output() setDefaultEvent=new EventEmitter();

  hideIframe(){

    this.isNavHidden=false
   this.isIframeHidden=true
   this.showMaxBotton=true
   this.showMinBotton=false
   this.resizeEvent.emit(false)
  }
  showIframe(){
  this.isIframeHidden=false
  this.showMaxBotton=false
  this.showMinBotton=true
  this.resizeEvent.emit(true)
  }
  hideNav(){
    this.hideNavEvent.emit()
    this.isIframeHidden=false
    this.isNavHidden=true
  }
  showFull(){
    this.isIframeHidden=false
    this.showMaxBotton=false
    this.showMinBotton=false
    this.isNavHidden=false
  this.showMinBottonofShowChat=true
  }
  setDefault(){
    this.isNavHidden=false
   this.isIframeHidden=true
   this.showMaxBotton=true
   this.showMinBotton=false
   this.showMinBottonofShowChat=false
    this.setDefaultEvent.emit()
  }

}
