import { Component } from '@angular/core';

@Component({
  selector: 'app-image-formatter',
  template: `<img [ngStyle]="{'border-radius':'8px', 'width':'165px','heigth':'150px','box-shadow': '0px 0px 20px #000000'}" src=\"{{ params.value }}\">`
})
export class ImageFormatterComponent  {

  params: any;
  agInit(params: any){
    this.params = params; 
  } 
}
