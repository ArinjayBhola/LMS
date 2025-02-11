import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Course } from "./getCourseList";

export const fetchCourseContent = createAsyncThunk("fetchCourseContent", async (courseId: string) => {
  const result = await axios.post("/api/study-type", { courseId, studyType: "ALL" });
  return result.data;
});

interface CourseState {
  isLoading: boolean;
  isError: boolean;
  data: Record<string, Course>;
}

const initialState: CourseState = {
  isLoading: false,
  data: {},
  isError: false,
};

const courseContentSlice = createSlice({
  name: "courseContent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourseContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCourseContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data[action.meta.arg] = action.payload; // Store data per courseId
    });
    builder.addCase(fetchCourseContent.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default courseContentSlice.reducer;
