import {Component} from '@angular/core';
import {FirebaseListObservable} from 'angularfire2/database';
import {ModalController, ActionSheetController, AlertController, NavController, NavParams, ToastController } from 'ionic-angular';
import {Post} from '../../models/post';
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
              public alertCtrl: AlertController,
              public actionSheetCtrl: ActionSheetController,
              public firebaseService: FirebaseService,
              public navParams: NavParams, public modalCtrl: ModalController) {


    this.posts = this.firebaseService.getPosts();
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message: `Welcome to APP_NAME, ${data.email}`,
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  addRequest() {
    let prompt = this.alertCtrl.create({
      title: 'New Request',
      message: "",
      inputs: [
        {
          name: 'description',
          placeholder: 'Request'
        },
        {
          name: 'value',
          placeholder: '$',
          value: '0'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            let p = new Post("");
            p.description = data.description;
            p.value = data.value;
            this.posts.push(p);
          }
        }
      ]
    });
    prompt.present();
  }

  updateRequest(reqID, reqDescription, reqValue) {
    let prompt = this.alertCtrl.create({
      title: 'Request',
      message: "Update this request",
      inputs: [
        {
          name: 'description',
          placeholder: 'Request',
          value: reqDescription
        },
        {
          name: 'value',
          placeholder: '$',
          value: reqValue
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.posts.update(reqID, {
              description: data.description, value: data.value
            });
          }
        }
      ]
    });
    prompt.present();
  }

  deleteRequest(songId: string) {
    this.posts.remove(songId);
  }

  showOptions(reqID, reqDescription, reqValue) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Update',
          handler: () => {
            this.updateRequest(reqID, reqDescription, reqValue);
          }
        }, {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.deleteRequest(reqID);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
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
