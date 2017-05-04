import { Component } from '@angular/core';
import { AlertController, ModalController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { CreateMatchPage } from '../create-match/create-match';
import { ScoreboardPage } from '../scoreboard/scoreboard';
import { Storage } from '@ionic/storage';
import { Match } from '../../models/match';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private createMatchPage: any;
  private matches: Match[] = [];
  constructor(public navCtrl: NavController, public storage: Storage, private alerCtrl: AlertController, private modalCtrl: ModalController) {
    this.createMatchPage = CreateMatchPage;
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.refresh();
  }

  delete(event: any, startDate: Date) {
    this.storage.ready().then(() => {
      this.storage.remove(startDate.toISOString()).then(() => {
        this.refresh();
      }).catch((ex) => {
        console.log("Abbruch..." + ex);
      });
    });
  }

  resumeMatch(event: any, match: Match) {
    this.navCtrl.push(ScoreboardPage, {
      match: match
    });
  }
  
  createNewMatch() {
    this.navCtrl.push(CreateMatchPage);
  }

  send(event: any, match: Match) {
    let alert = this.alerCtrl.create({
      title: 'Match Bericht',
      message: JSON.stringify(match, null, 2),
      buttons: ['Ok']
    });
    alert.present();
  }

  refresh() {
    console.log("Refresh called!");
    this.matches = [];
    this.storage.ready().then(() => {
      this.storage.forEach((match, key) => {
        this.matches.push(Match.fillFromJson(match));
      }).then(() => {
        this.matches.sort((a: Match, b: Match): number => {
          if (a.getStartDate() < b.getStartDate()) return 1;
          if (a.getStartDate() > b.getStartDate()) return -1;
          return 0;
        });
      });
    });
  }
}
