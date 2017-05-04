import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Match } from '../../models/match';
import { ScoreboardPage } from '../scoreboard/scoreboard';

@IonicPage()
@Component({
  selector: 'page-create-match',
  templateUrl: 'create-match.html',
})
export class CreateMatchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateMatch');
  }

  createNewMatch(player1: string, player2: string) {
    let match = new Match(player1, player2, player1, null);
    this.storage.ready().then(() => {
      this.storage.set(match.getStartDate().toISOString(), match);
    });
    this.navCtrl.push(ScoreboardPage, {
      match: match
    });

  }
  show() {
    this.storage.forEach((match) => {
      console.log(JSON.stringify(match, null, 2));
    })
  }
}
