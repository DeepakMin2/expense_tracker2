import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  somedata = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tristique est metus, at finibus magna varius a. Etiam scelerisque libero eget diam.";

  constructor(public matDialog: MatDialog){}
  showTerms():void{
    this.matDialog.open(DialogComponent,{
      data:{
        somedata: this.somedata
      }
    });
  }

}
