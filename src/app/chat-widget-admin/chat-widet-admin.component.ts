import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PropertyService } from '../service/property.service';
import { Property } from '../interface/property';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-chat-widet-admin',
  templateUrl: './chat-widet-admin.component.html',
  styleUrls: ['./chat-widet-admin.component.css'],
})
export class ChatWidetAdminComponent implements OnInit {
  constructor(private service: PropertyService,private sanitizer:DomSanitizer) {}
  isNavVisible: boolean = true;
  isIframeVisible: boolean = true;
  showMax: boolean = true;
  showMin: boolean = true;
  properties: Property[] = [];
  divLeft: number = 0;
  divTop: number = 0;
  divHeight: number = 0;
  divWidth: number = 0;
  divBgColor: string = '';
  isDivDraggable: boolean = false;
  iframeTop: number = 0;
  iframeLeft: number = 0;
  iframeHeight: number = 0;
  iframeWidth: number = 0;
  isEnabled: boolean = true;
  fontColor: string = 'black';
  fontFamily: string = 'arial';
  fontSize: number = 18;
  temp: number = 0;
  fontText:string="text"
  safeURL:SafeResourceUrl=""
  ngOnInit(): void {
    this.service.getAllProperties().subscribe(() => {
      this.properties = this.service.properties;
      this.ExtractProperty();
      this.isIframeVisible = false;
      this.isNavVisible = true;
      this.showMax = true;
      this.showMin = false;
      this.temp = this.divWidth;
    });
  }
  setProperty(id: number, value: string) {
    this.properties[id - 1].value = value;
    switch (id - 1) {
      case 0:
        this.service.left = parseInt(this.properties[0].value);
        this.divLeft = parseInt(this.properties[0].value);
        this.isIframeVisible = false;
        break;
      case 1:
        this.service.top = parseInt(this.properties[1].value);
        this.divTop = parseInt(this.properties[1].value);
        this.isIframeVisible = false;
        break;
      case 2:
        this.service.bgColor = this.properties[2].value;
        this.divBgColor = this.properties[2].value;
        this.isIframeVisible = false;
        break;
      case 4:
        this.service.width = parseInt(this.properties[4].value);
        this.divWidth = parseInt(this.properties[4].value);
        this.isIframeVisible = false;
        this.iframeWidth = this.divWidth;
        break;
      case 3:
        this.service.height = parseInt(this.properties[3].value);
        this.divHeight = parseInt(this.properties[3].value);
        this.isIframeVisible = false;
        break;
      case 5:
        if((this.properties[5].value)==='true'){
          this.isDivDraggable=true
          this.service.isDraggable=true
        }
        else{
          this.isDivDraggable=false;
          this.service.isDraggable=false
        }
        break;
      case 6:
        this.service.iframeHeight = parseInt(this.properties[6].value);
        this.iframeHeight = parseInt(this.properties[6].value);
        this.divWidth = parseInt(this.properties[7].value);
        this.showIframe(true)
        break;
      case 7:
        this.service.iframeWidth = parseInt(this.properties[7].value);
        this.iframeWidth = parseInt(this.properties[7].value);
        this.divWidth = parseInt(this.properties[7].value);
        this.showIframe(true)
        break;
      case 8:
        if((this.properties[8].value)==='true'){
          this.isEnabled=true
          this.service.isEnabbled=true
        }
        else{
          this.isEnabled=false;
          this.service.isEnabbled=false
        }
        break;
      case 9:
        this.service.fontSize = parseInt(this.properties[9].value);
        this.fontSize =parseInt(this.properties[9].value);
        break;
      case 10:
        this.service.fontfamily = (this.properties[10].value);
        this.fontFamily = (this.properties[10].value);
        break;
      case 11:
        this.service.fontColor = (this.properties[11].value);
        this.fontColor = (this.properties[11].value);
        break;
        case 12:
          this.service.fontText = (this.properties[12].value);
          this.fontText = (this.properties[12].value);
          break;
          case 13:
            this.service.IframeUrl= (this.properties[13].value)
            this.safeURL=this.sanitizer.bypassSecurityTrustResourceUrl(this.properties[13].value)
           break;
    }

  }
  setAllProperty() {
    this.service.setAllProperty(this.properties).subscribe((Response) => {
    });
    alert("Successfully updated")
  }
  ExtractProperty() {
    this.divLeft = parseInt(this.properties[0].value);
    this.divTop = parseInt(this.properties[1].value);
    this.divHeight = parseInt(this.properties[3].value);
    this.divWidth = parseInt(this.properties[4].value);
    this.divBgColor = this.properties[2].value;
    if((this.properties[5].value)==='true'){
      this.isDivDraggable=true
    }
    else{
      this.isDivDraggable=false;
    }
    this.iframeHeight = parseInt(this.properties[6].value);
    this.iframeWidth = parseInt(this.properties[7].value);
    if((this.properties[8].value)==='true'){
      this.isEnabled=true
    }
    else{
      this.isEnabled=false;
    }
    this.fontSize=parseInt(this.properties[9].value);
    this.fontFamily=this.properties[10].value;
    this.fontColor=(this.properties[11].value);
    this.fontText=this.properties[12].value;
    this.safeURL=this.sanitizer.bypassSecurityTrustResourceUrl(this.properties[13].value)
  }
  showIframe(data: boolean) {
    if (data) {
      this.isIframeVisible = true;
      this.showMax = false;
      this.showMin = true;
      this.changePosition();
      this.divWidth = this.iframeWidth;
      // this.iframeTop=this.divTop+this.divHeight
      // this.iframeLeft=this.divLeft
      console.log(this.iframeTop, this.iframeLeft, this.iframeHeight);
    } else {
      this.isIframeVisible = false;
      this.showMax = true;
      this.showMin = false;
      this.divWidth = this.temp;
    }
  }
  closeDiv() {
    this.divWidth = this.temp;
    this.showMax = true;
    this.showMin = false;
    this.isNavVisible = false;
    this.isIframeVisible = false;
    setTimeout(() => {
      this.isNavVisible = true;
    }, 2000);
  }
  changePosition() {
    const target = document.getElementById('navbar');
    const left = target?.getBoundingClientRect().left;
    const top = target?.getBoundingClientRect().top;
    if (left && top) {
      this.iframeTop = top + this.divHeight;
      this.iframeLeft = left;
    }
  }
}
