import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Match } from '../../models/match';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-scoreboard',
  templateUrl: 'scoreboard.html',
})
export class ScoreboardPage {
  private match: Match;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alerCtrl: AlertController, private storage: Storage) {
    this.match = navParams.get('match');
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
    let alert = this.alerCtrl.create({
      title: 'Match Pause ',
      subTitle: "Have a break have beer",
      message: this.match.getPlayer1() + ' und ' + this.match.getPlayer2() + ' wollen sich eine wohlverdiente Pause nehmen. Die Pausen für den Matchreport werden nach dem letzten abgeschlossen Satz registriert.',
      buttons: [
        {
          text: 'Pause',
          handler: () => {
            this.match.pause();
            this.store();
          }
        },
        {
          text: 'Abbrechen',
          handler: () => {
          }
        }]
    });
    alert.present();
  }

  store() {
    this.storage.ready().then(() => {
      this.storage.set(this.match.getStartDate().toISOString(), this.match).then(() => {
        console.log('Match updated! ' + this.match.getStartDate().toISOString());
      });
    });
  }
}
