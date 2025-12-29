import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  lastFetched: number | null; // Timestamp for cache invalidation
  cacheValidityMs: number; // Cache validity period (5 minutes)
}

// Cache validity: 5 minutes
const CACHE_VALIDITY_MS = 5 * 60 * 1000;

export const fetchCourse = createAsyncThunk<Course[], string | undefined, { state: { courseData: CourseState } }>(
  "fetchCourse",
  async (createdBy) => {
    const response = await axios.post("/api/courses", { createdBy: createdBy });
    return response.data;
  },
  {
    // Only fetch if cache is stale or empty
    condition: (_, { getState }) => {
      const { courseData } = getState();
      const { lastFetched, cacheValidityMs, isLoading } = courseData;
      
      // Don't fetch if already loading
      if (isLoading) return false;
      
      // Fetch if never fetched or cache is stale
      if (!lastFetched) return true;
      const now = Date.now();
      return now - lastFetched > cacheValidityMs;
    },
  }
);

// Force fetch regardless of cache (for manual refresh)
export const forceFetchCourse = createAsyncThunk<Course[], string | undefined>(
  "forceFetchCourse",
  async (createdBy) => {
    const response = await axios.post("/api/courses", { createdBy: createdBy });
    return response.data;
  }
);

const initialState: CourseState = {
  isLoading: false,
  data: [],
  isError: false,
  lastFetched: null,
  cacheValidityMs: CACHE_VALIDITY_MS,
};

const getCourseList = createSlice({
  name: "courseList",
  initialState,
  reducers: {
    // Invalidate cache manually (e.g., after creating/deleting a course)
    invalidateCache: (state) => {
      state.lastFetched = null;
    },
    // Update a single course in cache without refetching all
    updateCourseInCache: (state, action: PayloadAction<Course>) => {
      const index = state.data.findIndex((c) => c.courseId === action.payload.courseId);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    // Remove a course from cache
    removeCourseFromCache: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((c) => c.courseId !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // Regular fetch (with cache check)
    builder.addCase(fetchCourse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCourse.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.lastFetched = Date.now();
    });
    builder.addCase(fetchCourse.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isLoading = false;
      state.isError = true;
    });

    // Force fetch (bypasses cache)
    builder.addCase(forceFetchCourse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(forceFetchCourse.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.lastFetched = Date.now();
    });
    builder.addCase(forceFetchCourse.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { invalidateCache, updateCourseInCache, removeCourseFromCache } = getCourseList.actions;
export default getCourseList.reducer;

