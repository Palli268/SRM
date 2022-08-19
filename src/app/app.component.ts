import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as converter from 'xml-js';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  originalData: any = [];
  allItems: any[] = [];
  containers: string[] = [];
  viewReTry: boolean = false;


  public xmlItems: any;
  constructor(private _http: HttpClient) { this.loadXML(); }
  loadXML() {
    this._http.get('/assets/data.json',
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
        responseType: 'text'
      })
      .subscribe((data) => {
        // let result = converter.xml2json(data, {compact: true});
        // console.log(JSON.parse(result).Employee);


        this.originalData = JSON.parse(data);

        this.originalData.forEach((container: any) => {
          container['items_new'] = [];
          container.items.forEach((item: string) => {
            this.allItems.push(item);
          })
        })


        this.containers = this.originalData.map((e: any) => e.name);
        console.log(this.containers.push('list1'));

      });

  }



  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }




  }


  submit() {
    this.originalData.forEach((con: any) => {
      con.items_new.forEach((it: any) => {
        let x = con.items.find((i: any) => i.name == it.name)

        x ? it.color = 'green' : it.color = 'red';

      })
    })

    this.viewReTry = true;

  }

  reTry() {
    this.loadXML();
    this.viewReTry = false;
  }


}
