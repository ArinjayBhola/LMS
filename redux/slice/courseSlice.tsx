import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    course: 0,
    status: "",
    courseId: "",
  },
  reducers: {
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setCourseStatus: (state, action) => {
      state.status = action.payload;
    },
    setCourseId: (state, action) => {
      state.courseId = action.payload;
    },
  },
});

export default courseSlice.reducer;
export const { setCourse, setCourseStatus, setCourseId } = courseSlice.actions;
