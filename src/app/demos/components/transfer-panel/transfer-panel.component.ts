import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { TransferItem } from './types';

@Component({
  selector: 'app-transfer-panel',
  templateUrl: './transfer-panel.component.html',
  styleUrls: ['./transfer-panel.component.scss']
})
export class TransferPanelComponent implements OnInit, OnChanges {
  @Input() list: TransferItem[] = [];
  @Input() search = false;
  @Output() changed = new EventEmitter<TransferItem[]>();
  showList: TransferItem[] = [];
  selecteds: TransferItem[] = [];
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    const { list } = changes;
    console.log(changes)
    if(list) {
      this.showList = list.currentValue.slice();
      this.selecteds = this.list.filter(item => item.checked);
    }
  }
  ngOnInit(): void {
  }

  onInput(event: Event) {
    const { value } = (event.target as HTMLInputElement);
    console.log(value)
    this.showList = this.list.filter(item => item.value.includes(value))
  }

  itemClick(target: TransferItem){
    const index = this.targetIndex(target.key)
    if(index > -1) {
      this.selecteds.splice(index,1)
    } else {
      this.selecteds.push(target);
    }
    this.changed.emit(this.selecteds);
  }
  targetIndex(key:string):number {
    return this.selecteds.findIndex(item => item.key === key);
  }
}
