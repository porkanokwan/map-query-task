import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GisService } from '../gis.service';

@Component({
  selector: 'app-table-country',
  templateUrl: './table-country.component.html',
  styleUrls: ['./table-country.component.css'],
})
export class TableCountryComponent implements OnInit {
  @Input() valueArr: ValueType[] = [];
  @Output() onClickStateName = new EventEmitter<any>();
  rowID: number = 0;

  constructor(private gisService: GisService) {}

  ngOnInit(): void {}

  onClickRow(event: Event) {
    if (
      +(<HTMLTableRowElement>event.target).id !== this.rowID &&
      this.rowID !== 0
    ) {
      this.gisService.clear();
    }

    this.rowID = +(<HTMLTableRowElement>event.target).id;
    const stateNameObj = this.valueArr.find((item) => this.rowID === item.id);
    this.onClickStateName.emit({
      id: this.rowID,
      type: stateNameObj?.type,
      rings: stateNameObj?.rings,
    });
  }
}

type ValueType = {
  id: number;
  stateName: string;
  stateAbbr: string;
  subRegieon: string;
  rings: number[][];
  type: string;
};
