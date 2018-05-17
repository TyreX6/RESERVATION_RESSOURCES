import {AfterContentInit, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, AfterContentInit {

  /**
   * @property type : string
   * @variation : confirm, error, info, custom
   */
  @Input() type;
  @Input() content;
  @Input() title;
  @Input() onConfirm: Function;
  @Input() onCancel: Function;
  @Input() onClose: Function;
  @Input() onRetry: Function;
  @Input() id;
  @Input() onShow: Function;
  constructor() {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
  }

}
