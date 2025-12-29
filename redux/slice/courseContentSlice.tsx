import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Course } from "./getCourseList";

interface ContentCache {
  data: Course;
  lastFetched: number;
}

interface CourseContentState {
  isLoading: boolean;
  isError: boolean;
  cache: Record<string, ContentCache>;
  cacheValidityMs: number;
}

// Cache validity: 5 minutes
const CACHE_VALIDITY_MS = 5 * 60 * 1000;

export const fetchCourseContent = createAsyncThunk<
  { courseId: string; data: Course },
  string,
  { state: { courseContent: CourseContentState } }
>(
  "fetchCourseContent",
  async (courseId: string) => {
    const result = await axios.post("/api/study-type", { courseId, studyType: "ALL" });
    return { courseId, data: result.data };
  },
  {
    // Only fetch if cache is stale or missing
    condition: (courseId, { getState }) => {
      const { courseContent } = getState();
      const cached = courseContent.cache[courseId];
      
      if (courseContent.isLoading) return false;
      if (!cached) return true;
      
      const now = Date.now();
      return now - cached.lastFetched > courseContent.cacheValidityMs;
    },
  }
);

// Force fetch regardless of cache
export const forceFetchCourseContent = createAsyncThunk<{ courseId: string; data: Course }, string>(
  "forceFetchCourseContent",
  async (courseId: string) => {
    const result = await axios.post("/api/study-type", { courseId, studyType: "ALL" });
    return { courseId, data: result.data };
  }
);

const initialState: CourseContentState = {
  isLoading: false,
  cache: {},
  isError: false,
  cacheValidityMs: CACHE_VALIDITY_MS,
};

const courseContentSlice = createSlice({
  name: "courseContent",
  initialState,
  reducers: {
    invalidateCourseContent: (state, action) => {
      delete state.cache[action.payload];
    },
    clearAllContentCache: (state) => {
      state.cache = {};
    },
  },
  extraReducers: (builder) => {
    // Regular fetch
    builder.addCase(fetchCourseContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCourseContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cache[action.payload.courseId] = {
        data: action.payload.data,
        lastFetched: Date.now(),
      };
    });
    builder.addCase(fetchCourseContent.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isLoading = false;
      state.isError = true;
    });

    // Force fetch
    builder.addCase(forceFetchCourseContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(forceFetchCourseContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cache[action.payload.courseId] = {
        data: action.payload.data,
        lastFetched: Date.now(),
      };
    });
    builder.addCase(forceFetchCourseContent.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { invalidateCourseContent, clearAllContentCache } = courseContentSlice.actions;
export default courseContentSlice.reducer;

