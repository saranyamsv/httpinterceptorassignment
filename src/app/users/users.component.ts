import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  constructor(private httpclient:HttpClient,private loadservice:LoadingService,private cdRef: ChangeDetectorRef){}

  userdata$:any;
  displayLoader = false; 

  ngOnInit(): void {
    this.loadservice.loadobs.subscribe((status)=>{this.displayLoader = status;console.log('🟡 Loader Status Received:', status);});
    this.loadservice.updateLoadingstatus(true);
   this.userdata$ = this.httpclient.get(`https://jsonplaceholder.typicode.com/users`).pipe(tap({next: () =>{console.log('API Call Completed, Stopping Loader');this.loadservice.updateLoadingstatus(false);this.cdRef.detectChanges()}}));

  }
  

}
