import {Component} from '@angular/core';
import {FirebaseListObservable} from 'angularfire2/database';
import {ModalController, NavController, NavParams, AlertController } from 'ionic-angular';
import {FirebaseService} from '../../providers/firebase-service';
import {NewPostPage} from "../new-post/new-post";
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public firebaseService: FirebaseService,
              public navParams: NavParams,
              public modalCtrl: ModalController) {


    this.posts = this.firebaseService.getPosts();
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
