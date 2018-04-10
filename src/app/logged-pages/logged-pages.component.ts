import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../global.service";

@Component({
  selector: 'app-logged-pages',
  templateUrl: './logged-pages.component.html',
  styleUrls: ['./logged-pages.component.css']
})
export class LoggedPagesComponent implements OnInit {

  constructor(private _globalService:GlobalService) {

  }


  ngOnInit() {
  }

}
