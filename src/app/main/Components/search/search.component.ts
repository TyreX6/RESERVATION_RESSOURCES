import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {GlobalService} from "../../../services/global.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  closeResult: string;
  public modalRef: BsModalRef;

  constructor(private modalService: BsModalService,
              private _globalService: GlobalService) {
  }

  ngOnInit() {
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  changeUsername() {
    this._globalService.currentUser.username = "ghandri1993";
    console.log(this._globalService.currentUser);
  }


}
