import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-language-popover',
  templateUrl: './language-popover.page.html',
  styleUrls: ['./language-popover.page.scss'],
})
export class LanguagePopoverPage implements OnInit {

  constructor(private popover: PopoverController) { }

  ngOnInit() {
  }

  async closeModal(lan) {
    await this.popover.dismiss(lan);
  }
}
