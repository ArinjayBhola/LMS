import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    course: 0,
  },
  reducers: {
    setCourse: (state, action) => {
      state.course = action.payload;
    },
  },
});

export default courseSlice.reducer;
export const { setCourse } = courseSlice.actions;
