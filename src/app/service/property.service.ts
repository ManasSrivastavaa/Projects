import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../interface/property';
import { Observable } from 'rxjs/internal/Observable';
import {  map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  constructor(private http:HttpClient) { }

  properties:Property[]=[]
  //pending
  fontfamily:string="arial"
  fontSize:number=20
  fontColor:string="black"
  isEnabbled:boolean=false
  fontText:string="text"
  //done
  left:number=0;
  top:number=0;
  height:number=0
  width:number=0
  bgColor:string=""
  isDraggable:boolean=false
  iframeHeight:number=0
  iframeWidth:number=0
  isshowCallHidden:boolean=true
  IframeUrl:string=""
  DefaultTop:number=0
  DefaultLeft:number=0
  getAllProperties():Observable<void>{
      return this.http.get<Property[]>('http://localhost:8083/properties').pipe(map(data=>{
     this.properties=data;
      this.ExtractProperty();
      const target = document.getElementById('call');
      const left = target?.getBoundingClientRect().left;
      const top = target?.getBoundingClientRect().top;
      if (typeof left !="undefined" && typeof top !="undefined") {
        this.DefaultLeft = left - this.width + 30;
        this.DefaultTop = top + 55;
        console.log(this.DefaultLeft,this.DefaultTop)
      }
    }));
  }

  setAllProperty(list:Property[]){
    console.log(list)
    return this.http.post<Property[]>('http://localhost:8083/properties',list);
  }
  ExtractProperty(){
    this.left=parseInt(this.properties[0].value)
    this.top=parseInt(this.properties[1].value)
    this.height=parseInt(this.properties[3].value)
    this.width=parseInt(this.properties[4].value)
    this.bgColor=this.properties[2].value
    this.isDraggable=(Boolean)(this.properties[5].value)
    this.iframeHeight=parseInt(this.properties[6].value)
    this.iframeWidth=parseInt(this.properties[7].value)
  if((this.properties[8].value)==="true"){
    this.isEnabbled=true
  }
  else{
    this.isEnabbled=false
  }
    console.log(this.isEnabbled,"*****");
    this.fontSize=parseInt( this.properties[9].value)
    this.fontfamily=(this.properties[10].value)
    this.fontColor=(this.properties[11].value)
    this.fontText=(this.properties[12].value)
    this.IframeUrl=this.properties[13].value

    console.log(this.isEnabbled,this.left,this.top,this.height,this.width,this.bgColor,this.isDraggable,this.iframeHeight,this.iframeWidth)
  }
}
