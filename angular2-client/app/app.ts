/// <reference path="../typings/tsd.d.ts" />

import {Component, View, bootstrap, NgFor} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';

import {Home} from './components/home/home';
import {Tasks} from './components/tasks/tasks';
import {Login} from './components/login/login';
import {Settings} from './components/settings/settings';

import {AuthenticationService} from 'services/AuthenticationService';
import {EventManager} from "utils/eventbus/EventManager";

@Component({
    selector: 'app',
    appInjector: [AuthenticationService]
})
@RouteConfig([
  { path: '/', component: Home, as: 'home' },
  { path: '/tasks', component: Tasks, as: 'tasks' },
  { path: '/login', component: Login, as: 'login' },
  { path: '/settings', component: Settings, as: 'settings' }
])
@View({
  templateUrl: './app.html?v=<%= VERSION %>',
  directives: [RouterOutlet, RouterLink]
})
class App {
    authenticationService: AuthenticationService;
    public loggedIn: boolean;

    constructor(authenticationService: AuthenticationService) {
        this.authenticationService = authenticationService;
        let eventManager = EventManager.getInstance();

        this.loggedIn = authenticationService.isLoggedIn();
        eventManager.subscribe("authenticationStateChange", (msg: boolean) => {
            this.loggedIn = msg;
            console.log("App caught event, loggedIn: " + msg);
        });
    }

    logout(event) {
        event.preventDefault();
        // TODO perhaps throw event so the service does not need to be called
        this.authenticationService.logOut();
        this.loggedIn = false;
    }
}

bootstrap(App, [routerInjectables, AuthenticationService]);
