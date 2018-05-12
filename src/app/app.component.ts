import {Component} from '@angular/core';
import {saveAs} from 'file-saver/FileSaver';
import {MzToastService} from 'ng2-materialize';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  string: string;
  accord: string;
  editableString: string;
  editableStringId: string;
  strings = [];
  isAddingString: boolean;
  isAddingAccord: boolean;
  isEditing: boolean;
  isShowPoints: boolean;
  isEditingString: boolean;

  constructor(private toastService: MzToastService) {
  }

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
    console.log(this.accord);
  }

  startAddingString() {
    this.isAddingString = true;
    this.isEditing = true;
  }

  addAccord() {
    this.isShowPoints = true;
  }

  addAccordOnPoint(stringId, index) {
    const accords = this.strings.find(i => i.id === stringId).accords;
    const length = this.accord.length;
    let notEmpty = false;
    for (let i = 0; i < length; i++) {
      if (accords[index + i] !== null) {
        notEmpty = true;
      }
    }
    if (notEmpty) {
      this.toastService.show('Нет места для аккорда такой длинны или место уже занято', 2000);
      return;
    }
    accords[index] = this.accord;
    if (length > 1) {
      this.strings.find(i => i.id === stringId).accords.splice(index + 1, length - 1);
    }
    this.accord = null;
    this.isShowPoints = false;
    this.isAddingAccord = false;
    this.isEditing = false;
  }

  deleteAccord(stringId, index) {
    const accords = this.strings.find(i => i.id === stringId).accords;
    if (accords[index].length > 1) {
      const newArr = [];
      for (let j = 0; j < accords[index].length; j++) {
        newArr.push(null);
      }
      accords.splice(index, 1, ...newArr);
      return;
    }
    accords[index] = null;
  }

  saveFileAsJson() {
    const blob = new Blob([JSON.stringify(this.strings, null, 4)], {type: 'application/json'});
    saveAs(blob, 'song.json');
  }

  saveFileAsTxt() {
    let song = '';
    this.strings.forEach(string => {
      string.accords.forEach(accord => {
        song += accord == null ? ' ' : accord;
      });
      song += '\r\n';
      string.letters.forEach(letter => {
        song += letter === '&nbsp;' ? ' ' : letter;
      });
      song += '\r\n';
    });
    const blob = new Blob([song], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'song.txt');
  }


  uploadSong(event) {
    this.strings = [];
    const fr = new FileReader();
    fr.onload = (eventResult) => {
      this.strings = JSON.parse(eventResult.target['result']);
      event.target['value'] = null;
    };
    fr.readAsText(event.target.files[0]);
  }

  editString(string) {
    this.editableStringId = string.id;
    this.isEditingString = true;
    this.editableString = string.letters.join('').replace(/&nbsp;/gi, ' ');
  }

  removeString(stringId) {
    this.strings = this.strings.filter(i => i.id !== stringId);
  }

  saveEditingString() {
    const string = this.strings.find(i => i.id === this.editableStringId);
    if (this.editableString.length >= string.letters.length) {
      for (let i = 0; i < (this.editableString.length - string.letters.length); i++) {
        string.accords.push(null);
      }
    } else {
      string.accords.length -= string.accords.length - this.editableString.length;
    }

    string.letters = [];
    for (let i = 0; i < this.editableString.length; i++) {
      this.editableString[i] === ' ' ? string.letters.push('&nbsp;') : string.letters.push(this.editableString[i]);
    }

    this.isEditingString = false;
    this.editableString = null;
    this.editableStringId = null;
  }

  cancelEditing() {
    this.isEditingString = false;
    this.editableString = null;
    this.editableStringId = null;
    this.accord = null;
    this.isShowPoints = false;
    this.isAddingAccord = false;
    this.string = '';
    this.isAddingString = false;
    this.isEditing = false;
  }
}
