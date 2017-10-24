import {Component} from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth";
import {User} from "../../models/user";
import {ModalController, NavController} from "ionic-angular";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  user: User;

  constructor(private afAuth: AngularFireAuth,
              public navCtrl: NavController,
              public modalController: ModalController) {
    this.user = {username: null, email: null, password: null, phone: null, id: null};
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      this.afAuth.authState.subscribe(data => {
        if (data && data.email && data.uid) {
          this.user.email = data.email;
        }
      })
    })
  }

  logout() {
    this.afAuth.auth.signOut().then(_ => {
      this.modalController.create(LoginPage).present();
    })
  }
}
