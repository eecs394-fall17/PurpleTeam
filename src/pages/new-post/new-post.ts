import {Component} from "@angular/core";
import {Platform, NavParams, ViewController} from "ionic-angular";
import {FirebaseService} from "../../providers/firebase-service";
import {Post} from "../../models/post";

@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html'
})
export class NewPostPage {
  post: Post;

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,
              public firebaseService: FirebaseService) {
    this.post = new Post("");
  }

  confirm() {
    this.post.timestamp = new Date().toString();
    this.firebaseService.addPost(this.post);
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
