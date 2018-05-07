import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  string = '';
  strings = [];

  saveString() {
    const stringArr = [];

    for (let i = 0; i < this.string.length; i++) {
      console.log(`symbol: ${this.string[i]}`);
      this.string[i] === ' ' ? stringArr.push('&nbsp;') : stringArr.push(this.string[i]);
    }
    this.strings.push(stringArr);
    this.string = '';
  }

}
