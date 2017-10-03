import {Component} from "@angular/core";

import {Platform, NavParams, ViewController} from "ionic-angular";

@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html'
})
export class NewPostPage {
  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController) {
  }

  points: number = 0;

  confirm() {
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
