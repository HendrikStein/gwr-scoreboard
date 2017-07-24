import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { CreateMatchPage } from '../create-match/create-match';
import { ScoreboardPage } from '../scoreboard/scoreboard';
import { Storage } from '@ionic/storage';
import { Match } from '../../models/match';
import { EmailComposer } from '@ionic-native/email-composer';
import { File} from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private createMatchPage: any;
  private matches: Match[] = [];
  constructor(public navCtrl: NavController, public storage: Storage, private alerCtrl: AlertController, private file: File, private emailComposer: EmailComposer) {
    this.createMatchPage = CreateMatchPage;
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.refresh();
  }

  delete(event: any, startDate: Date) {
     let alert = this.alerCtrl.create({
      title: 'Löschen',
      message: 'Soll dieses Match wirklich entfernt werden?',
      buttons: [
        {
          text: 'Löschen',
          handler: () => {
            this.deleteAction(startDate);
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

  deleteAction(startDate: Date){
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
    this.sendMail(match, match.matchReportToCsv());
  }
/*
  private saveFile(match: Match) {
    let fileName: string = match.getStartDate().toISOString() + ".json";
    let csv: string = this.convertToCsv(match);
    let dir = this.file.tempDirectory + "gwr/";
    console.log("this.file.tempDirectory " + this.file.tempDirectory);
    console.log("fileName " + fileName);
    console.log("Csv Content " + csv);

    this.file.checkDir(this.file.tempDirectory, 'gwr').then(ex => {
      console.log(this.file.tempDirectory + 'gwr exist:' + ex);
    });

    this.file.createDir(this.file.tempDirectory, "gwr", true).then(
      (dict: DirectoryEntry) => {
        console.log("Created!" + dict.fullPath);
      }
    )

    this.file.writeFile(this.file.tempDirectory, "gwr/" + fileName, csv, true)
      .then(_ => {
        this.sendMail(match, dir + fileName);
      })
      .catch(err => {
        this.file.writeExistingFile(this.file.tempDirectory, "gwr" + fileName, csv)
          .then(_ => {
            this.sendMail(match, dir + fileName);
          })
          .catch(
          (err: DirectoryEntry) => {
            console.log("Error" + err.fullPath);
          })
      })
  }*/

  /*
  private convertToColumnCsv(match: Match): string {
    let csv = match.getPlayer1() + ";" + match.getPlayer2() + "\n";
    match.getMatchSets().forEach(function (set: MatchSet) {
      csv += set.scoreCard[match.getPlayer1()] + ";" + set.scoreCard[match.getPlayer2()] + "\n";
    });
    return csv
  }*/

/*
  private convertToCsv(match: Match): any {
    let csv: string = this.convertLine(match.getPlayer1(), match) + "\r\n";
    csv += this.convertLine(match.getPlayer2(), match);
    return csv;
  }

  private convertLine(player: string, match: Match): string {
    let line: string = player + ";";
    match.getMatchSets().forEach(function (set: MatchSet) {
      line += set.scoreCard[player] + ";";
    });
    return line;
  }
*/

  private sendMail(match: Match, content: string) {
    let email = {
      subject: 'Match report ' + match.getPlayer1() + ' - ' + match.getPlayer2(),
      body: content,
      isHtml: false,
    };
    this.emailComposer.open(email);
  }

  refresh() {
    console.log("Refresh called!");
    this.matches = [];
    this.storage.ready().then(() => {
      this.storage.forEach((match, key) => {
        this.matches.push(Match.fillFromJson(match));
      }).then(() => {
        if (this.matches.length > 0) {
          this.matches.sort((a: Match, b: Match): number => {
            if (a.getStartDate() < b.getStartDate()) return 1;
            if (a.getStartDate() > b.getStartDate()) return -1;
            return 0;
          });
        } else {
          this.createNewMatch();
        }
      });
    });
  }
}
