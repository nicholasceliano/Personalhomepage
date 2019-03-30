import { Component, OnInit } from '@angular/core';
import { GoogleService } from '../_services/google.service';
import { OAuthUrlResponse } from '../_models/oauth-url-response';
import { GmailThread } from '../_models/gmail-thread';
import { finalize, } from 'rxjs/operators';
import { timer, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GmailService } from '../_services/gmail.service';

@Component({
	selector: 'app-gmail',
	templateUrl: './gmail.component.html',
	styleUrls: ['./gmail.component.css']
})
export class GmailComponent implements OnInit {

	constructor(
		private gmailService: GmailService,
		private googleService: GoogleService) { }

	private pollSubscription: Subscription;
	public isPanelLoaded = false;
	public signInUrl: string;
	public googleAuthenicated = false;
	public unreadThreads: GmailThread[] = [];

	ngOnInit() {
		this.pollSubscription = timer(0, environment.mailPanelRefreshTime).subscribe(() => this.refreshGmailPanel());
	}

	authenticate() {
		window.location.href = this.signInUrl;
	}

	private refreshGmailPanel() {
		const googleUserAuthUID = this.googleService.GetUserAuthUID();

		if (googleUserAuthUID && googleUserAuthUID.length === 36) {
			this.gmailService.GetUnreadEmails().pipe(finalize(() => this.isPanelLoaded = true)).subscribe((res) => {
				if (res.err) {
					this.failedAuthentication(res.msg);
				} else {
					this.googleAuthenicated = true;

					if (JSON.stringify(this.unreadThreads) !== JSON.stringify(res.data)) {
						this.unreadThreads = res.data;
					}
				}
			}, (err) => {
				this.failedAuthentication(err);
			});
		} else {
			this.failedAuthentication();
		}
	}

	private failedAuthentication(err?: string) {
		this.googleAuthenicated = false;
		this.unreadThreads = [];
		this.googleService.GetOAuth2SignInUrl().pipe(finalize(() => this.isPanelLoaded = true)).subscribe((res: OAuthUrlResponse) => {
			this.signInUrl = res.url;
		});

		if (err) {
			console.log(err);
		}
	}
}
