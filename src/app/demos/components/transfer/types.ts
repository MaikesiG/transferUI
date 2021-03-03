export interface TransferItem {
  checked: boolean;
  key: string;
  value: string;
  direction?:Direction;
}
export type Direction = 'left'| 'right';
