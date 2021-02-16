export interface DataGridColumn {
    property?: string;
    caption?: string;
    datatype?: string;
    canSort?: boolean;
    visible?: boolean;
    displayValue?: (rowData: any) => any;
}
  