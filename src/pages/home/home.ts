import {Component} from '@angular/core';
import {FirebaseListObservable} from 'angularfire2/database';
import {ModalController, NavController, NavParams, AlertController } from 'ionic-angular';
import {FirebaseService} from '../../providers/firebase-service';
import {NewPostPage} from "../new-post/new-post";
import * as moment from 'moment';
import firebase from 'firebase';
import { SMS } from '@ionic-native/sms';
import 'rxjs/add/operator/map';

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
              public modalCtrl: ModalController,
              private sms: SMS) {

    this.posts = this.firebaseService.getPosts();
  }

  belongsToMe(post) {
    if (firebase.auth().currentUser == null) {
      return false
    }
    return post.authorKey === firebase.auth().currentUser.uid;
  }

  getUsername(post) {
    return post.username;
    // console.log(post.authorKey);
    // return this.firebaseService.getUsername(id);
  }

  clickPost(post) {
    if (this.belongsToMe(post)) {
      // edit my own post
      this.alertCtrl.create({
        title: "Mark Complete?",
        message: "Would you like to mark this request as complete?",
        buttons: [
          {
            text: "No",
            role: 'cancel',
          },
          {
            text: "Yes",
            handler: () => {
              this.firebaseService.removePost(post.$key);
            }
          }
        ]
      }).present();
    } else {
      // accept request
      this.alertCtrl.create({
        title: "Accept Request?",
        message: "Would you like to accept this request and notify the original poster?",
        buttons: [
          {
            text: "No",
            role: 'cancel',
          },
          {
            text: "Yes",
            handler: () => {
              this.acceptRequest(post);
            }
          }
        ]
      }).present();
    }
  }

  acceptRequest(post) {
    post.likes += 1;
    this.firebaseService.updatePost(post);
    // text the poster!
    let text = 'I would like to accept your request:\n' +
      (post.description.length >= 35 ? post.description.slice(0,30) + '...' : post.description)
    console.log(text);
    this.sms.send('4805705969', text);
  }

  openModal(data) {
    let modal = this.modalCtrl.create(NewPostPage, data);
    modal.present();
  }

  removePost(postID: string) {
    this.alertCtrl.create({
      title: "Delete Post",
      message: "Are you sure you want to delete this post? This action cannot be undone.",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.firebaseService.removePost(postID);
          }
        }
      ]
    }).present();

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
