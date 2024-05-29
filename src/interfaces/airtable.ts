export interface TableMeta {
  id: number;
  tenantId?: number;  // Optional, as it's not exposed in JSON
  userId?: number;    // Optional, as it's not exposed in JSON
  name: string;
  fullTableName?: string;  // Optional, as it's not exposed in JSON
  uuid: string;
  pic: string;
  description: string;
}

export interface ColumnMeta {
  tenantId?: number;  // Optional, as it's not exposed in JSON
  userId?: number;    // Optional, as it's not exposed in JSON
  tableId?: number;   // Optional, as it's not exposed in JSON

  id: number;
  parentColumnId: number;
  name: string;
  subtitle: string;
  key: string;
  type: string;
  length: number;

  deletable: boolean;
  visible: boolean;
  editable: boolean;
  fixedLength: boolean;
  sort: number;
  ordered: boolean;
}
