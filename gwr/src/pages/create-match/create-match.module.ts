import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateMatchPage } from './create-match';

@NgModule({
  declarations: [
    CreateMatchPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateMatchPage),
  ],
  exports: [
    CreateMatchPage
  ]
})
export class CreateMatchModule {}
