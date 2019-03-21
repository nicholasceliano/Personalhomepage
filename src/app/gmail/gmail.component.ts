import { Component, OnInit } from '@angular/core';
import { GoogleService } from '../_services/google.service';
import { OAuthUrlResponse } from '../_models/oauth-url-response';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-gmail',
  templateUrl: './gmail.component.html',
  styleUrls: ['./gmail.component.css']
})
export class GmailComponent implements OnInit {

  constructor(private googleService: GoogleService) { }

  public signInUrl: string;
  public loginRequired: boolean = true;

  ngOnInit() {
    var googleUserAuthUID = this.googleService.GetUserAuthUID();
    
    if (googleUserAuthUID) {
      this.loginRequired = false;
      this.googleService.GetGmailData().subscribe((res) => console.log(res));
    } else {
      this.loginRequired = true;
      this.googleService.GetOAuth2SignInUrl().subscribe((res: OAuthUrlResponse) => {
        this.signInUrl = res.url;
      });
    }
  }

  signIn() {
    window.location.href = this.signInUrl;
  }
}