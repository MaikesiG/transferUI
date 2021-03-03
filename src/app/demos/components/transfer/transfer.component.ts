import { isNgTemplate } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { Direction, TransferItem } from './types';
import cloneDeep from 'lodash.clonedeep'

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferComponent implements OnInit , OnChanges{
  @Input() sourceData :TransferItem[];
  @Input() search = false;
  @Input() customTpl: TemplateRef<any>;

  leftDatas: TransferItem[] = [];
  rightDatas: TransferItem[] = [];
  leftShowList: TransferItem[] = [];
  rightShowList: TransferItem[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const { sourceData } = changes;
    if(sourceData && sourceData.currentValue) {
      sourceData.currentValue.forEach( element => {
        if(!element.direction || element.direction === 'left') {
          element.direction = 'left';
          this.leftDatas.push(element);
          this.leftShowList.push(element);
        } else {
          element.direction = 'right';
          this.rightDatas.push(element);
          this.rightShowList.push(element);
        }
      });
    }
  }

  to(direction:Direction) {
    if(direction === 'left') {
      this.trueMove('right','left');
    }else{
      this.trueMove('left','right');
    }

  }
  private trueMove(from:Direction,to:Direction){
    const moveList: TransferItem[] = cloneDeep(this[from+'ShowList'])
    .filter(element => element.checked)
    .map(element => {
      element.checked = false;
      return element;
    })
    console.log(moveList)
    this[to+'ShowList'] = this[to+'ShowList'].concat(moveList);
    this[from+'ShowList'] = this[from+'ShowList'].filter(element => !element.checked);
    this[to+'Datas'] = this[to+'Datas'].concat(moveList);
    this[from+'Datas'] = this[from+'Datas'].filter(element => {
      return moveList.findIndex(item => item.key === element.key) === -1;
    });
  }
  ngOnInit(): void {
  }
  disableBtn(direction:Direction) {
    const targetDatas = direction === 'left' ? this.rightDatas: this.leftDatas;
    return targetDatas.findIndex(element => element.checked) === -1;
  }
  onSelect(index: number, direction: Direction) {
    this[direction + 'ShowList'][index].checked = !this[direction + 'ShowList'][index].checked;
    this[direction + 'ShowList'] = this[direction + 'ShowList'].slice();
    // console.log(this.leftDatas);
  }
  onFiltered(value:string,direction:Direction) {
    this[direction+'ShowList'] = this[direction + 'Datas'].filter(element => element.value.includes(value));
  }
}
