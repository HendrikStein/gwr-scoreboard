import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Match } from '../../models/match';

/**
 * Generated class for the Scoreboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-scoreboard',
  templateUrl: 'scoreboard.html',
})
export class ScoreboardPage {
  private match: Match;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.match = navParams.get('match');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Scoreboard');
  }

}