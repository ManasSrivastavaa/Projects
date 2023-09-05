import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../interface/property';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObsPropertyService {

  constructor(private http:HttpClient) { }

  properties:Property[]=[]
  //pending
  fontfamily=new BehaviorSubject<string>("Arial")
  fontSize=new BehaviorSubject<number>(18)
  fontColor=new BehaviorSubject<string>("black")
  isEnabbled=new BehaviorSubject<boolean>(true)
  fontText=new BehaviorSubject<string>("text")
  //done
  left=new BehaviorSubject<Number>(parseInt(this.properties[0].value));
  top=new BehaviorSubject<Number>(10)
  height=new BehaviorSubject<Number>(10)
  width=new BehaviorSubject<Number>(10)
  bgColor=new BehaviorSubject<String>("black")
  isDraggable=new BehaviorSubject<Boolean>(true)
  iframeHeight=new BehaviorSubject<Number>(10)
  iframeWidth=new BehaviorSubject<Number>(10)
  getAllProperties():Observable<void>{
      return this.http.get<Property[]>('http://localhost:8083/properties').pipe(map(data=>{
     this.properties=data;
      console.log('@@',this.properties);
      this.ExtractProperty();
    }));
  }
  setAllProperty(list:Property[]){
    console.log(list)
    return this.http.post<Property[]>('http://localhost:8083/properties',list);
  }
  ExtractProperty(){
    this.left.next(parseInt(this.properties[0].value))
    this.top.next(parseInt(this.properties[1].value))
    this.height.next(parseInt(this.properties[3].value))
    this.width.next(parseInt(this.properties[4].value))
    this.bgColor.next(this.properties[2].value)
    this.isDraggable.next((Boolean)(this.properties[5].value))
    this.iframeHeight.next(parseInt(this.properties[6].value))
    this.iframeWidth.next(parseInt(this.properties[7].value))
    this.isEnabbled.next((Boolean)(this.properties[8].value))
    this.fontSize.next(parseInt( this.properties[9].value))
    this.fontfamily.next((this.properties[10].value))
    this.fontColor.next((this.properties[11].value))
    this.fontText.next((this.properties[12].value))

    console.log(this.left,this.top,this.height,this.width,this.bgColor,this.isDraggable,this.iframeHeight,this.iframeWidth)
  }

}
