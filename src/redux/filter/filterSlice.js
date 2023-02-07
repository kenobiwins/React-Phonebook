import { createSlice } from '@reduxjs/toolkit';
// import { statusFilters } from 'constants/statusFilter.constants';

const filterInitialState = {
  filterValue: '',
  // filterStatus: statusFilters.all,
  toAlphabet: true,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    changeFilter(state, action) {
      state.filterValue = action.payload;
    },
    // setStatusFilter(state, action) {
    //   state.filterStatus = action.payload;
    // },
    // toggleAlphabetStatus(state, action) {
    //   state.toAlphabet = action.payload;
    // },
  },
});

export const { changeFilter, setStatusFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
