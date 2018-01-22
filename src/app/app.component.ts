import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import firebase from 'firebase';
import { AuthService } from '../services/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 // @ViewChild(Nav) nav: Nav;
  signinPage = SigninPage;
  signupPage = SignupPage;
  isAuthenticated = false;
  homePage = HomePage;
  listPage = ListPage;
  @ViewChild( 'nav' ) nav: NavController;
  
  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
              private menuCtrl: MenuController, private authService: AuthService ) {
    this.initializeApp();
    firebase.initializeApp({
      apiKey: "AIzaSyCDkRFFSQAB0kqg2t20K_7yt4pDxN78lwQ",
      authDomain: "instantpot-8253e.firebaseapp.com"
    });
    firebase.auth().onAuthStateChanged( user => {
      if ( user ) {
        this.isAuthenticated = true;
        //this.nav.setRoot( this.listPage );
        this.rootPage = ListPage;
      } else {
        this.isAuthenticated = false;
        //this.nav.setRoot( this.signinPage );
        this.rootPage = SigninPage;
      }
    });
    // used for an example of ngFor and navigation
   /* this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];*/

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot( SigninPage );
  }
}
