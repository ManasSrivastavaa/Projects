import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  HostListener,
  ElementRef,
} from '@angular/core';
import { Property } from '../interface/property';
import { PropertyService } from '../service/property.service';
import { ChatWidgetComponent } from '../chat-widget/chat-widget.component';
import { ShortcutInput } from 'ng-keyboard-shortcuts/lib/ng-keyboard-shortcuts.interfaces';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  properties: Property[] = [];
  isNavHidden: boolean = true;
  divLeft: number = 0;
  divTop: number = 0;
  divHeight: number = 0;
  divWidth: number = 0;
  divBgColor: string = '';
  isDivDraggable: boolean = false;
  iframeHeight: number = 0;
  iframeWidth: number = 0;
  tempHeight: number = 0;
  tempWidth: number = 0;
  isEnabled: boolean = true;
  fontFamily: string = '';
  fontSize: number = 0;
  fontColor: string = '';
  fontText: string = '';
  textvalue: string = '';
  realDivTop: number = 0;
  realDivLeft: number = 0;
  shortcuts: ShortcutInput[] = [];
  count = 0;
  dragPosition = { x: 0, y: 0 };
  myposition = { x: 0, y: 0 };
  @HostListener('window:message', ['$event'])
  onPostMessage(event: MessageEvent) {
    const receivedData = event.data;
    console.log('Home', receivedData);
  }
  @ViewChild(ChatWidgetComponent, { static: false })
  child!: ChatWidgetComponent;
  @ViewChild('chatScreen') myElement!: ElementRef;

  constructor(public service: PropertyService) {}
  ngOnDestroy(): void {
    this.service.isshowCallHidden = true;
  }
  ngOnInit(): void {
    this.service.getAllProperties().subscribe(() => {
      this.properties = this.service.properties;
      this.ExtractProperty();
      this.tempHeight = this.divHeight;
      this.tempWidth = this.divWidth;
    });
    this.service.isshowCallHidden = false;
    this.shortcuts.push({
      key: 'alt + shift + c',
      command: () => {
        this.showChat();
      },
    });
  }

  ExtractProperty() {
    this.divLeft = parseInt(this.properties[0].value);
    this.realDivLeft = this.divLeft;
    this.divTop = parseInt(this.properties[1].value);
    this.realDivTop = this.divTop;
    this.divHeight = parseInt(this.properties[3].value);
    this.divWidth = parseInt(this.properties[4].value);
    this.divBgColor = this.properties[2].value;
    if (this.properties[5].value === 'true') {
      this.isDivDraggable = true;
    } else {
      this.isDivDraggable = false;
    }
    this.iframeHeight = parseInt(this.properties[6].value);
    this.iframeWidth = parseInt(this.properties[7].value);
    if (this.properties[8].value === 'true') {
      this.isEnabled = true;
    } else {
      this.isEnabled = false;
    }
    this.fontSize = parseInt(this.properties[9].value);
    this.fontFamily = this.properties[10].value;
    this.fontColor = this.properties[11].value;
    this.fontText = this.properties[12].value;
  }
  setProperty(id: number, value: string) {
    this.properties[id - 1].value = value;
    switch (id - 1) {
      case 0:
        this.service.left = parseInt(this.properties[0].value);
        this.divLeft = parseInt(this.properties[0].value);
        break;
      case 1:
        this.service.top = parseInt(this.properties[1].value);
        this.divTop = parseInt(this.properties[1].value);
        break;
      case 2:
        this.service.bgColor = this.properties[2].value;
        this.divBgColor = this.properties[2].value;
        break;
      case 4:
        this.service.width = parseInt(this.properties[4].value);
        this.divWidth = parseInt(this.properties[4].value);
        break;
      case 3:
        this.service.height = parseInt(this.properties[3].value);
        this.divHeight = parseInt(this.properties[3].value);
        console.log('hlw', this.service.height, this.divHeight);
        break;
      case 5:
        if (this.properties[5].value === 'true') {
          this.isDivDraggable = true;
          this.service.isDraggable = true;
        } else {
          this.isDivDraggable = false;
          this.service.isDraggable = false;
        }
        break;
      case 6:
        this.service.iframeHeight = parseInt(this.properties[6].value);
        this.iframeHeight = parseInt(this.properties[6].value);
        break;
      case 7:
        this.service.iframeWidth = parseInt(this.properties[7].value);
        this.iframeWidth = parseInt(this.properties[7].value);
        break;
      case 8:
        if (this.properties[8].value === 'true') {
          this.isEnabled = true;
          this.service.isEnabbled = true;
        } else {
          this.isEnabled = false;
          this.service.isEnabbled = false;
        }
        break;
      case 9:
        this.service.fontSize = parseInt(this.properties[9].value);
        this.fontSize = parseInt(this.properties[9].value);
        break;
      case 10:
        this.service.fontfamily = this.properties[10].value;
        this.fontFamily = this.properties[10].value;
        break;
      case 11:
        this.service.fontColor = this.properties[11].value;
        this.fontColor = this.properties[11].value;
        break;
      case 12:
        this.service.fontText = this.properties[12].value;
        this.fontText = this.properties[12].value;
        break;
    }
  }
  first: boolean = true;
  showChat() {
    this.child.showMinBottonofShowChat=true
    this.isNavHidden = false;
    this.child.showFull();
    this.divHeight = this.iframeHeight;
    this.divWidth = this.iframeWidth;
    const target = document.getElementById('call');
    let left = target?.getBoundingClientRect().left;
    let top = target?.getBoundingClientRect().top;
    if (typeof left != 'undefined' && typeof top != 'undefined') {
      this.divLeft = left - this.divWidth + 30;
      this.divTop = top;
      this.dragPosition = { x: this.divLeft, y: this.divTop };
      console.log(this.divTop, this.divLeft);
    }
  }
  // isDragged():void{
  // this.first=false
  // console.log("wasddragged");
  // }
  /**
   *
   * @param data
   */
  // resizeNav(data: boolean): void {
  //   if (data) {
  //     this.isNavHidden = false;
  //     this.divWidth = this.iframeWidth;
  //     let target = document.getElementById('chatScreen');
  //     let bottom = target?.getBoundingClientRect().bottom;
  //     let right = target?.getBoundingClientRect().right;
  //     let left = target?.getBoundingClientRect().left;

  //     if (
  //       typeof bottom != 'undefined' &&
  //       typeof right != 'undefined' &&
  //       typeof left != 'undefined'
  //     ) {
  //       if (
  //         bottom + this.iframeHeight > window.innerHeight &&
  //         bottom - 60 - this.iframeHeight < 60
  //       ) {
  //         this.divTop = 400;
  //         console.log('manas', this.divTop);
  //         if (left + this.iframeWidth > window.innerWidth) {
  //           this.divLeft = window.innerWidth - this.iframeWidth - 50;
  //         }
  //         this.divHeight = this.iframeHeight;
  //         return;
  //       } else if (bottom + this.iframeHeight > window.innerHeight) {
  //         this.divTop = bottom - this.iframeHeight - 80;
  //         console.log(this.divTop);
  //         if (this.divTop < 62) {
  //           this.divTop = 62;
  //           console.log(this.divTop, 'less');
  //         }
  //       }
  //       if (left + this.iframeWidth > window.innerWidth) {
  //         this.divLeft = window.innerWidth - this.iframeWidth - 50;
  //       }
  //       this.divHeight = this.iframeHeight;
  //     }
  //   } else {
  //     const target = document.getElementById('chatScreen');
  //     // const bottom = target?.getBoundingClientRect().bottom;
  //     // const right = target?.getBoundingClientRect().right;
  //     // const left = target?.getBoundingClientRect().left;
  //     this.isNavHidden = false;
  //     this.divWidth = this.tempWidth;
  //     this.divHeight = this.tempHeight;
  //     this.divTop = this.realDivTop;
  //     this.divLeft = this.realDivLeft;
  //   }
  // }
  getPosition($event: CdkDragEnd) {
    this.myposition = $event.dropPoint;
    console.log(this.myposition);
  }
  resizeNav(data: boolean): void {
    const target=document.getElementById("chatScreen")
      const left=target?.getBoundingClientRect().left
      const top=target?.getBoundingClientRect().top
    if(typeof left !=="undefined" && top !== undefined)
      this.myposition={x:left, y:top}
    if (data) {
      this.isNavHidden = false;
      this.divWidth = this.iframeWidth;
      this.divHeight = this.iframeHeight;
      if(this.myposition.x+this.iframeWidth>=window.innerWidth)
      {
         if(this.myposition.y+this.iframeHeight>window.innerHeight && this.myposition.y-this.iframeHeight<=60)
         {
          this.dragPosition={x:window.innerWidth-this.iframeWidth-10,y:66}
          console.log("1");

         }
          else if(this.myposition.y+this.iframeHeight>=window.innerHeight){
            console.log("2");

             this.dragPosition={x:window.innerWidth-this.divWidth,y:window.innerHeight-this.iframeHeight-this.tempWidth}
          }
          else{
            this.dragPosition={x:window.innerWidth-this.iframeWidth,y:this.myposition.y-60}
         }
      }
       else {
        if(this.myposition.y+this.iframeHeight+20>window.innerHeight && this.myposition.y-this.iframeHeight<=60)
        {
          console.log("3");

         this.dragPosition={x:this.myposition.x,y:66}
        }
         else if(this.myposition.y+this.iframeHeight>=window.innerHeight){
          console.log("4");
           this.dragPosition={x:this.myposition.x,y:window.innerHeight-this.iframeHeight-this.tempWidth}
         }
      }
  }
    else {
      this.isNavHidden = false;
      this.divWidth = this.tempWidth;
      this.divHeight = this.tempHeight;
      // const target=document.getElementById("chatScreen")
      // const left=target?.getBoundingClientRect().left
      // const top=target?.getBoundingClientRect().top
      // if(typeof left !=="undefined" && top !== undefined)
      // this.dragPosition={x:left,y:top}
    }
}
  hideNav() {
    this.isNavHidden = true;
  }
  setDefault(){
    this.resizeNav(false)
    this.dragPosition={x:this.realDivLeft,y:this.realDivTop-60};
  }
}
