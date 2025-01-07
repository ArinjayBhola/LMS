import { configureStore } from "@reduxjs/toolkit";
import courseSlice from "./slice/courseSlice";

const appStore = configureStore({
  reducer: {
    course: courseSlice,
  },
});

export default appStore;
