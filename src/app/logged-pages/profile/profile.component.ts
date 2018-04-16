import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs/Subscription';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  stockQuote: number;
  sub: Subscription;
  constructor(private dataService: DataService,private toastr: ToastrService,) { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

}
