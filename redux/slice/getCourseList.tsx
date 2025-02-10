import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Course {
  data: [];
  title: string;
  status: string;
  courseLayout: {
    courseTitle: string;
    courseSummary: string;
  };
  courseId: string;
  createdAt: string;
}

interface CourseState {
  isLoading: boolean;
  data: Course[];
  isError: boolean;
}

export const fetchCourse = createAsyncThunk<Course[], string | undefined>("fetchCourse", async (createdBy) => {
  const response = await axios.post("/api/courses", { createdBy: createdBy });
  return response.data;
});

const initialState: CourseState = {
  isLoading: false,
  data: [],
  isError: false,
};

const getCourseList = createSlice({
  name: "courseList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCourse.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(fetchCourse.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default getCourseList.reducer;
