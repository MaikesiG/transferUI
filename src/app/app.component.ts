import { Component } from '@angular/core';
import { SelectControlValueAccessor } from '@angular/forms';
import { TransferItem } from './demos/components/transfer-panel/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  list: TransferItem[] = [];
  title = 'transferUI';
  constructor() {
    this.setList();
  }
  setList() {
    this.list = [];
    const prefix = 'item' + Date.now().toString().slice(-3);
    for (let i = 0; i < 20; i++) {
      this.list.push({
        key: prefix + '_' + i,
        value: `${prefix}${i + 1}`,
        checked: i % 6 === 0,
      });
    }
  }
  onChanged(selected: TransferItem[]) {
    console.log('selected',selected)
    console.log();
  }
}


