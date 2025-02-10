import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface UserData {
  result: {
    id: number;
    name: string;
    email: string;
    isMember: boolean;
  };
}

interface CourseState {
  isLoading: boolean;
  data: UserData | null;
  isError: boolean;
}

export const fetchUserData = createAsyncThunk<UserData, string | undefined>("fetchUserData", async (userEmail) => {
  const response = await axios.get(`/api/get-user?email=${userEmail}`);
  return response.data;
});

const initialState: CourseState = {
  isLoading: false,
  data: null,
  isError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(fetchUserData.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default userSlice.reducer;
