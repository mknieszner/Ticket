import * as StatisticsActions from './statistics.actions';

export interface StatisticsState {
  selectedTableName: string;
}

const initialStatisticState: StatisticsState = {
  selectedTableName: null
};

export function statisticsReducers(state: StatisticsState = initialStatisticState, action: StatisticsActions.StatisticsActions) {
  switch (action.type) {
    case StatisticsActions.SET_SELECTED_TABLE_NAME:
      return {
        ...state,
        selectedTableName: action.payload
      };
    default:
      return state;
  }
}
