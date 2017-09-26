import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  toggled: boolean;
  searchTerm: String = '';
  items: string[];

  constructor( public navCtrl: NavController, public navParams: NavParams ) {
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
}
