import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    course: 0,
    status: "",
  },
  reducers: {
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setCourseStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export default courseSlice.reducer;
export const { setCourse, setCourseStatus } = courseSlice.actions;
