// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	oauthEndpoint: 'http://localhost:3000/oauth',
	apiEndpoint: 'http://localhost:3000/api',
	oauthCookiesName: {
		google: 'googleAuthUID',
		twitch: 'twitchAuthUID'
	},
	mailPanelRefreshTime: 30000,
	twitchPanelRefreshTime: 60000,
	youtubePlayerAPIEndpoint: 'https://www.youtube.com/iframe_api',
	twitchPlayerAPIEndpoint: 'https://player.twitch.tv/js/embed/v1.js',
	twitchChatWSEndpoint: 'ws://irc-ws.chat.twitch.tv:80'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
