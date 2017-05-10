import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { BarDetailsPage } from '../bar-details/bar-details';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  bars: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.bars = [];
    for(let i = 1; i < 11; i++) {
      this.bars.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  barTapped(event, bar) {
    this.navCtrl.push(BarDetailsPage, {
      bar: bar
    });
  }
}
