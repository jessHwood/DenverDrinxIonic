import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { BarDetailsPage } from '../bar-details/bar-details';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  bars: Array<{ }>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icons = ['flask', 'beer', 'football', 'basketball',
    'american-football'];

    this.bars = [];

    //this loop pushes 11 fake bars into the list
    //this is where we will do our pai call to fill the list
    for(let i = 1; i < 11; i++) {
      this.bars.push({
    day           : [ 4 ],
    hours         : [ [ 14 , 17 ] ],
    minutes       : [ [ 0 , 30 ] ],
    address       : "1234 Seseme Street",
    name          : "Big Bird's Booze House",
    drinkSpecials : "$1.00 Double-Shots",
    foodSpecials  : "$0.50 Corn-dogs",
    //we will need to replace "icon" with an image in the server and here
    icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }

    /////--working on making api calls to fill bar list below--//////
    // this.http.get('https://randomuser.me/api/?results=1')
    //   .then(function(response) { console.log(response); })
    //////////////////////--end api work--///////////////////////////
  }

  barTapped(event, bar) {
    this.navCtrl.push(BarDetailsPage, {
      bar: bar
    });
  }
}
