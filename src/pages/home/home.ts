import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'home.html'
})
export class HomePage {
  requests: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
              public actionSheetCtrl: ActionSheetController, db: AngularFireDatabase) {
    this.requests = db.list('/requests');
  }

  addRequest(){
    let prompt = this.alertCtrl.create({
      title: 'New Request',
      message: "",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'body',
          placeholder: 'Request'
        },
        {
          name: 'price',
          placeholder: '5'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.requests.push({
              title: data.title, body: data.body, postTime: new Date().toString(), price: data.price
            });
          }
        }
      ]
    });
    prompt.present();
  }

  updateRequest(reqID, reqTitle, reqBody, reqPrice){
    let prompt = this.alertCtrl.create({
      title: 'Request',
      message: "Update this request",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: reqTitle
        },
        {
          name: 'body',
          placeholder: 'Request',
          value: reqBody
        },
        {
          name: 'price',
          placeholder: '5',
          value: reqPrice
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.requests.update(reqID, {
              title: data.title, body: data.body, price: data.price
            });
          }
        }
      ]
    });
    prompt.present();
  }

  deleteRequest(songId: string){
    this.requests.remove(songId);
  }

  showOptions(reqID, reqTitle, reqBody, reqPrice) {
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
            this.updateRequest(reqID, reqTitle, reqBody, reqPrice);
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
