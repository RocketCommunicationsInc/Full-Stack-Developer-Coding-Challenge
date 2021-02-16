import { Component, Input, OnInit, OnChanges, ChangeDetectionStrategy, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { orderBy } from 'lodash';
import { DataGridColumn } from 'src/app/core/models';

interface DataGridColumnData {
  key: string;
  datatype: string;
  displayValue: (rowData: any) => any;
}

@Component({
  selector: 'my-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridComponent implements OnInit, OnChanges {
  @Input() items: any[] = [];
  @Input() columns: DataGridColumn[] = [];

  columnsCopy: DataGridColumn[] = [];
  itemsCopy: any[] = [];
  sortCategoryByAsc: boolean = null;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items'].currentValue && changes['items'].currentValue.length > 0) {
      // shallow copy items so we don't mess up original order 
      this.itemsCopy = [...this.items];
    }
    if (changes['columns']) {
      this.columnsCopy = this.columns.filter(col => col.visible == null || col.visible);
    }
  }

  getDisplayValue(item, column: DataGridColumnData) {
    return column.displayValue ? column.displayValue(item) : item[column.key];
  }

  getItemColumnData(item): DataGridColumnData[] {
    return Object.keys(item)
              .filter(key => this.columns.some(col => col.property === key && (col.visible == null || col.visible)))
              .sort((a, b) => this.columns.findIndex(col => col.property === a) - this.columns.findIndex(col => col.property === b))
              .map(key => { 
                const col = this.columns.find(col => col.property === key)
                return { 
                  key: key, 
                  datatype: col.datatype,
                  displayValue: col.displayValue,
                }
              });
  }

  onSortByCategory(dataGridColumn: DataGridColumn) {
    if (!!dataGridColumn.canSort) {
      if (this.sortCategoryByAsc == null) {
        this.sortCategoryByAsc = true;
      } else {
        this.sortCategoryByAsc = !this.sortCategoryByAsc;
      }
      const sortByOrder = this.sortCategoryByAsc ? 'asc' : 'desc';
      this.itemsCopy = orderBy(this.itemsCopy, dataGridColumn.property, sortByOrder);
      this.cdr.detectChanges();
    }
  }

}
