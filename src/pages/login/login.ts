import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {User} from "../../models/user";
import {RegisterPage} from "../register/register";

import { AngularFireAuth } from "angularfire2/auth";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth,
              public navCtrl: NavController,
              public viewController: ViewController,
              public navParams: NavParams) {
  }

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if (result) {
        this.viewController.dismiss();
      }
    } catch (e) {
      console.error(e);
    }
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
