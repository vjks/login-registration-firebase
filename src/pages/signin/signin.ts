import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

//@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(private authService: AuthService, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {

  }

  onSignin(form: NgForm) {
    console.log(form.value);
    const loading = this.loadingCtrl.create({
      content: 'You are being signed in ...'
    });
    loading.present();
    this.authService.signin(form.value.email, form.value.password)
      .then(data => {
        console.log(data);
        loading.dismiss();
      })
      .catch(error => {
        console.log(error);
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }
}