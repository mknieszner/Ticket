// import * as UserActions from './user.actions';
// import {UserModel} from '../user.model';
//
// const initialState = {
//   users: [{
//     'username': 'cybul',
//     'firstName': 'g',
//     'lastName': 'c',
//     'email': 'm@d.pl',
//     'enabled': true,
//     'roleNames': ['ROLE_USER', 'test TABLE']
//   },
//     {
//       'username': 'mk',
//       'firstName': 'mat',
//       'lastName': 'kni',
//       'email': 'm@k.pl', // TODO: remove password from user details on Tickets!
//       'enabled': true,
//       'roleNames': ['ROLE_USER', 'ROLE_ADMIN']
//     }
//   ]
// };
//
//
// export function userReducers(state = initialState, action: UserActions.UserActions) {
//   switch (action.type) {
//     case UserActions.ADD_USER:
//       return {
//         ...state,
//         users: [...state.users, action.payload]
//       };
//     default:
//       return state;
//   }
// }
