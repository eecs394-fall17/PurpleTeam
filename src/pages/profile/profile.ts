import {Component} from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth";
import {User} from "../../models/user";
import {NavController} from "ionic-angular";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  user: User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController) {
    this.user = {email: null, password: null};
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
}
