export interface IColumnDef {
  name: string;
  field?: string | string[];
  properties: {
    renderer: {
      type: "text" | "date" | "list" | "address";
      [x: string]: string;
    };
  };
}
