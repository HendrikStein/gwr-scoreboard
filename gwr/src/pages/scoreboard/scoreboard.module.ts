import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScoreboardPage } from './scoreboard';

@NgModule({
  declarations: [
    ScoreboardPage,
  ],
  imports: [
    IonicPageModule.forChild(ScoreboardPage),
  ],
  exports: [
    ScoreboardPage
  ]
})
export class ScoreboardModule {}
