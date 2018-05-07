import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  string: string;
  accord: string;
  strings = [];
  isAddingString: boolean;
  isAddingAccord: boolean;
  isEditing: boolean;
  isShowPoints: boolean;
  isEditingAccords: boolean;

  saveString() {
    const string = {
      id: '_' + Math.random().toString(36).substr(2, 9),
      letters: [],
      accords: []
    };
    for (let i = 0; i < this.string.length; i++) {
      string.accords.push(null);
      this.string[i] === ' ' ? string.letters.push('&nbsp;') : string.letters.push(this.string[i]);
    }
    this.strings.push(string);
    this.string = '';
    this.isAddingString = false;
    this.isEditing = false;
  }

  startAddingAccord() {
    this.isAddingAccord = true;
    this.isEditing = true;
  }

  startAddingString() {
    this.isAddingString = true;
    this.isEditing = true;
  }

  addAccord() {
    this.isShowPoints = true;
  }

  addAccorOnThisPoint(stringId, index) {
    this.strings.find(i => i.id === stringId).accords[index] = this.accord;
    this.accord = null;
    this.isShowPoints = false;
    this.isAddingAccord = false;
    this.isEditing = false;
  }

  deleteAccord(stringId, index) {
    this.strings.find(i => i.id === stringId).accords[index] = null;
  }

}
