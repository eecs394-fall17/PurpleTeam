import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import { User } from "../../models/user";

import { AngularFireAuth } from "angularfire2/auth";
import {FirebaseService} from "../../providers/firebase-service";
import firebase from 'firebase';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController,
              public viewController: ViewController,
              public navParams: NavParams, public firebaseService: FirebaseService) {
  }

  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(this.user)
      // this.firebaseService.addUsername(user.username, firebase.auth().currentUser.uid);
      this.user.id = firebase.auth().currentUser.uid;
      this.firebaseService.addUser(this.user);
      console.log(result);
    } catch (e) {
      console.error(e);
    }

    this.viewController.dismiss();

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
