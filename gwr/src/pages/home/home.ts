import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { CreateMatchPage } from '../create-match/create-match';
import { Storage } from '@ionic/storage';
import { Match } from '../../models/match';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private createMatchPage: any;
  private matches: Match[] = [];
  constructor(public navCtrl: NavController, public storage: Storage, private alerCtrl: AlertController) {
    this.createMatchPage = CreateMatchPage;
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.refresh();
  }

  delete(event: any, startDate: Date) {
    this.storage.remove(startDate.toISOString()).then(() => {
      this.refresh();
    });
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
    console.log("Data refreshed!");
    this.matches = [];
    this.storage.forEach((match, key) => {
      this.matches.push(Match.fillFromJson(match));
    }).then(() => {
      this.matches.sort((a: Match, b: Match): number => {
        if (a.getStartDate() < b.getStartDate()) return 1;
        if (a.getStartDate() > b.getStartDate()) return -1;
        return 0;
      });
    });
  }
}
