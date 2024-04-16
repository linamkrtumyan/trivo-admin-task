import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../utils/constants";

interface User {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  age: number;
  accessToken: string;
}

interface LoginState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  authToken: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

const saveTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem("accessToken", accessToken);
};

const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("accessToken");
};

export const login = createAsyncThunk<
  User,
  LoginCredentials,
  { rejectValue: string }
>("login/login", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post<{ accessToken: string; user: User }>(
      `${BASE_URL}/login`,
      credentials
    );

    saveTokenToLocalStorage(response.data.accessToken);

    return response.data.user;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data.error;
    } else {
      return thunkAPI.rejectWithValue("An error occurred");
    }
  }
});

const initialState: LoginState = {
  user: null,
  isLoading: false,
  error: null,
  authToken: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      removeTokenFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.authToken = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const { resetError, logout } = loginSlice.actions;
export default loginSlice.reducer;
