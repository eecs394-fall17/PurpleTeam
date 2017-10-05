import {Component} from '@angular/core';
import {FirebaseListObservable} from 'angularfire2/database';
import {ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import {FirebaseService} from '../../providers/firebase-service';
import {NewPostPage} from "../new-post/new-post";
import {AngularFireAuth} from "angularfire2/auth";
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts: FirebaseListObservable<any[]>;

  constructor(private afAuth: AngularFireAuth, private toast: ToastController,
              public navCtrl: NavController,
              public firebaseService: FirebaseService,
              public navParams: NavParams, public modalCtrl: ModalController) {
    this.posts = this.firebaseService.getPosts();
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message: `Welcome to Udoit, ${data.email}`,
          duration: 3000
        }).present();
      } else {
        this.toast.create({
          message: `Could not find authentication details.`,
          duration: 3000
        }).present();
      }
    })
  }

  openModal(data) {
    let modal = this.modalCtrl.create(NewPostPage, data);
    modal.present();
  }

  removePost(songId: string) {
    this.firebaseService.removePost(songId);
  }

  like(reqID) {
    let l = 0;
    this.firebaseService.afdb.object('/posts/' + reqID).subscribe(post => l = post.likes);
    this.posts.update(reqID, {likes: l + 1});
  }

  howLongAgo(timestamp) {
    return moment(timestamp).fromNow();
  }
}
