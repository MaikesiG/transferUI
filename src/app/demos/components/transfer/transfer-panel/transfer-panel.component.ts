import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TransferComponent } from '../transfer.component';

import { TransferItem } from '../types';

@Component({
  selector: 'app-transfer-panel',
  templateUrl: './transfer-panel.component.html',
  styleUrls: ['./transfer-panel.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class TransferPanelComponent implements OnInit, OnChanges {
  @Input() list: TransferItem[] = [];
  @Input() search = false;
  // @Output() changed = new EventEmitter<TransferItem[]>();
  @Output() select = new EventEmitter<number>();
  @Output() filtered = new EventEmitter<string>();
  // showList: TransferItem[] = [];
  selecteds: TransferItem[] = [];
  constructor(readonly parent:TransferComponent) {}
  ngOnChanges(changes: SimpleChanges): void {
    const { list } = changes;
    console.log(changes)
    if(list) {
      // this.showList = list.currentValue.slice();
      this.selecteds = this.list.filter(item => item.checked);

    }
  }
  ngOnInit(): void {
  }

  onInput(event: Event) {
    const { value } = (event.target as HTMLInputElement);
    console.log(value)
    // this.showList = this.list.filter(item => item.value.includes(value))
    this.filtered.emit(value);
  }

  itemClick(index: number){
    // const index = this.targetIndex(target.key)
    // if(index > -1) {
    //   this.selecteds.splice(index,1)
    // } else {
    //   this.selecteds.push(target);
    // }
    // this.changed.emit(this.selecteds);
    this.select.emit(index);
  }
  targetIndex(key:string):number {
    return this.selecteds.findIndex(item => item.key === key);
  }
}
