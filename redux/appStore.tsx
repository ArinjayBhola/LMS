import { configureStore } from "@reduxjs/toolkit";
import courseSlice from "./slice/courseSlice";
import userSlice from "./slice/userSlice";
import getCourseList from "./slice/getCourseList";
import courseContentSlice from "./slice/courseContentSlice";

const appStore = configureStore({
  reducer: {
    course: courseSlice,
    userData: userSlice,
    courseData: getCourseList,
    courseContent: courseContentSlice,
  },
});

export default appStore;
export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;
