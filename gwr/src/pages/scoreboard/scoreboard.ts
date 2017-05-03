import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Match } from '../../models/match';
import { Pause } from "../../models/pause";

@IonicPage()
@Component({
  selector: 'page-scoreboard',
  templateUrl: 'scoreboard.html',
})
export class ScoreboardPage {
  private match: Match;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alerCtrl: AlertController) {
    this.match = navParams.get('match');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Scoreboard');
  }

  change() {
    let player1 = this.match.getPlayer1();
    let player2 = this.match.getPlayer2();
    this.match.setPlayer1(player2);
    this.match.setPlayer2(player1);
  }

  pause() {
    let pause: Pause = this.match.pause();
    let alert = this.alerCtrl.create({
      title: 'Match Pause ',
      subTitle: pause.getFormattedDateTime(),
      message: this.match.getPlayer1() + ' und ' + this.match.getPlayer2() + ' nehmen sich eine wohlverdiente Pause.',
      buttons: ['Fortsetzen']
    });
    alert.present();
  }
}
