import * as RoleActions from './role.actios';

const initialState = {
  roles: [{
    'id': 35,
    'userDtos': [{
      'username': 'mk',
      'firstName': 'mat',
      'lastName': 'kni',
      'email': 'm@k.pl',
      'enabled': true,
      'roleNames': ['BIG', 'ROLE_USER', 'ROLE_ADMIN']
    }],
    'name': 'BIG',
    'description': 'Table: BIG access role.'
  }, {
    'id': 28,
    'userDtos': [{
      'username': 'mk',
      'firstName': 'mat',
      'lastName': 'kni',
      'email': 'm@k.pl',
      'enabled': true,
      'roleNames': ['BIG', 'ROLE_USER', 'ROLE_ADMIN']
    }],
    'name': 'ROLE_ADMIN',
    'description': 'Admin Roles'
  }]
};


export function roleReducers(state = initialState, action: RoleActions.RoleActions) {
  switch (action.type) {
    case RoleActions.ADD_ROLE:
      return {
        ...state,
        roles: [...state.roles, action.payload]
      };
    default:
      return state;
  }

}
