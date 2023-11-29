import { UserDTO } from "./user.model";

export namespace User {

  export class GetAllUser {
    static readonly type = '[User] Get All User';
  }

  export class AddUser {
    static readonly type = "[User] Add User"
    constructor(public payload: UserDTO) { }//Make sure all Parameters are PUBLIC,else in Action handler it can't be accessed
  }

  export class UpdateUser {
    static readonly type = '[User] Update User';
    constructor(public payload: UserDTO) {}
  }

  export class DeleteUser {
    static readonly type = '[User] Delete User';
    constructor(public id: number) {}
  }

}
