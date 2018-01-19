export const options = [
  {shortcut: 'ST', name: 'Short text'},
  {shortcut: 'DE', name: 'Description'},
  {shortcut: 'DT', name: 'Date'},
  {shortcut: 'EN', name: 'Enum'},
  {shortcut: 'IN', name: 'Number'}
];
export interface Token {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
  jti: string
}
export class RowContentModel {
  public id: number;
  public name: string;
  public columnValueDtos: { [key: string]: { ['value']: string } }[];
  public createdBy: string;
  public createdOn: string; // TODO date?
  public lastModifiedBy: string;
  public lastModifiedOn: string; // TODO date?
}

export class TableDefinitionModel {
  public id: number;
  public name: string;
  public columnDetailDefinitionDtoList: any[];
}
