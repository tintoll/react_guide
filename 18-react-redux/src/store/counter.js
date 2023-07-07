import { createSlice } from "@reduxjs/toolkit";
const initState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState: initState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    decrement(state, action) {
      state.counter--;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
