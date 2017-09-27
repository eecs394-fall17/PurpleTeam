import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { Post } from '../../app/Post';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts: FirebaseListObservable<any>;

  toggled: boolean;
  searchTerm: string = '';
  items: string[];

  constructor( public navCtrl: NavController, public alertCtrl: AlertController,
               public actionSheetCtrl: ActionSheetController, db: AngularFireDatabase,
               public navParams: NavParams ) {
    this.posts = db.list('/posts');
    this.toggled = false;
    this.initializeItems();
  }

  ionViewDidLoad() {
    console.log( 'ionViewDidLoad HomePage' );
  }

  toggleSearch() {
    this.toggled = !this.toggled;
  }

  initializeItems() {
    this.items = ['Amsterdam','Bogota','Mumbai','San José','Salvador'];
  }

  triggerInput( ev: any ) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  addRequest(){
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
          placeholder: '$'
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

  updateRequest(reqID){
    let prompt = this.alertCtrl.create({
      title: 'Request',
      message: "Update this request",
      inputs: [
        {
          name: 'description',
          placeholder: 'Request'
        },
        {
          name: 'value',
          placeholder: '$'
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

  deleteRequest(songId: string){
    this.posts.remove(songId);
  }

  showOptions(reqID) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Request',
          role: 'destructive',
          handler: () => {
            this.deleteRequest(reqID);
          }
        },{
          text: 'Update',
          handler: () => {
            this.updateRequest(reqID);
          }
        },{
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
}
