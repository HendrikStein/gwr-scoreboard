import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Match } from '../../models/match';
import { Pause } from "../../models/pause";
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-scoreboard',
  templateUrl: 'scoreboard.html',
})
export class ScoreboardPage {
  private match: Match;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alerCtrl: AlertController, public storage: Storage) {
    this.match = navParams.get('match');
    console.log(this.storage.driver);
  }

  ionViewDidLoad() {

  }

  change() {
    let player1 = this.match.getPlayer1();
    let player2 = this.match.getPlayer2();
    this.match.setPlayer1(player2);
    this.match.setPlayer2(player1);
  }

  score(player: string) {
    this.match.score(player);
    this.store();
  }

  pause() {
    let pause: Pause = this.match.pause();
    this.store();
    //console.log(JSON.stringify(this.match, null, 2));
    let alert = this.alerCtrl.create({
      title: 'Match Pause ',
      subTitle: pause.getFormattedDateTime(),
      message: this.match.getPlayer1() + ' und ' + this.match.getPlayer2() + ' nehmen sich eine wohlverdiente Pause.',
      buttons: ['Fortsetzen']
    });
    alert.present();
  }

  store() {
    console.log('Store called');
    this.storage.ready().then(() => {
      this.storage.set(this.match.getStartDate().toISOString(), this.match).then(() => {
        console.log('Match updated! ' + this.match.getStartDate().toISOString());
      });
    });
  }
}
