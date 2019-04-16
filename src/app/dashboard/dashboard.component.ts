import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material';
import { SettingsDialogComponent } from '../structure/settings-dialog/settings-dialog.component';
import { LocalStorageService } from '../_services/utility/local-storage.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	constructor(
		private title: Title,
		private dialog: MatDialog,
		private localStorageService: LocalStorageService) { }

	ngOnInit() {
		this.title.setTitle(environment.appTitle);

		this.localStorageService.watchStorage().subscribe((localStorageItem) => {
			if (localStorageItem[environment.localStorage.dashboardSettings]) {
				const darkTheme = localStorageItem[environment.localStorage.dashboardSettings].swDarkTheme;
				// need to load this through abstract factory

				console.log(`load dark them: ${darkTheme}`);
			}
		});
	}

	showSettings() {
		this.dialog.open(SettingsDialogComponent, {
			disableClose: true,
			autoFocus: true,
			panelClass: 'settings-modalbox'
		});
	}
}
