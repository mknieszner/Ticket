export class RoleModel {
  public name: string;
  public id: number;
  public userDtos: [{
    username: string,
    firstName: string,
    lastName: string,
    password?: string,
    email: string,
    enabled: boolean,
    roleNames: any[]
  }];
  public description: string;
}
