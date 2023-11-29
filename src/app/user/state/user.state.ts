import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserDTO } from './user.model';
import { User } from './user.action';

export interface UserStateModel {
  allUsers: Array<UserDTO>;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    allUsers: [
      {
        id: 1,
        firstName: 'Harsh',
        lastName: 'Koralwala',
        address: {
          city: 'Ahmedabad',
          landmark: 'Shilaj Circle',
          pincode: '380058',
          street: 'bacancy house',
        },
      },
    ],
  },
})
export class UserState {
  //#region ADD User
  @Action(User.AddUser)
  addUser(ctx: StateContext<UserStateModel>, { payload }: User.AddUser) {
    const state = ctx.getState();
    ctx.setState({
      allUsers: [
        ...state.allUsers,
        {
          id: 2,
          firstName: 'Harsh 2',
          lastName: 'Koralwala 2',
          address: {
            city: 'Ahmedabad 2',
            landmark: 'Shilaj Circle 3',
            pincode: '380058 2',
            street: 'bacancy house 2',
          },
        },
      ],
    });
  }
  //#endregion

  //#region UPDATE User
  @Action(User.UpdateUser)
  updateUser(ctx: StateContext<UserStateModel>, action: User.UpdateUser) {
    const state = ctx.getState();
    const allUsers = [...state.allUsers];
    const idOfUser = allUsers.findIndex((p) => p.id === action.payload.id);
    allUsers[idOfUser] = action.payload;
    ctx.setState({
      ...state,
      allUsers: allUsers,
    });
  }
  //#endregion

  //#region DELETE User
  @Action(User.DeleteUser)
  deleteUser(ctx: StateContext<UserStateModel>, { id }: User.DeleteUser) {
    const currentState = ctx.getState();
    ctx.setState({
      ...ctx.getState(),
      allUsers: currentState.allUsers.filter((t) => t.id != id),
    });
  }
  //#endregion

  //#region GET All Users
  @Action(User.GetAllUser)
  getUser(ctx: StateContext<UserStateModel>) {
    return ctx.getState().allUsers;
  }

  @Selector() //Selectors are calculated when state changes
  static getAllUsers(state: UserStateModel) {
    return state.allUsers;
  }
}
//#endregion
