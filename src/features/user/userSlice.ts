import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../../utils/constants';

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  phone: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const fetchUsers = createAsyncThunk<User[], void>(
  'user/fetchUsers',
  async () => {
    const response: AxiosResponse<User[]> = await axios.get(`${BASE_URL}/profiles`);
    return response.data;
  }
);

export const createUser = createAsyncThunk<User, User>(
  'user/createUser',
  async (newUser) => {
    const response: AxiosResponse<User> = await axios.post(`${BASE_URL}/profiles`, newUser);
    return response.data;
  }
);
export const editUser = createAsyncThunk<User, { editedUser: User, id: string }>(
    'user/editUser',
    async ({ editedUser, id }) => {
      console.log(editedUser, 'editedUser');
      console.log(id, 'id');
      const response: AxiosResponse<User> = await axios.put(`${BASE_URL}/profiles/${id}`, editedUser);
      return response.data;
    }
  );

  export const deleteUser = createAsyncThunk<string, string>(
    'user/deleteUser',
    async (id) => {
      await axios.delete(`${BASE_URL}/profiles/${id}`);
      return id;
    }
  );

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
      })
      .addCase(editUser.fulfilled, (state, action: PayloadAction<User>) => {
        const editedUserIndex = state.users.findIndex(user => user.id === action.payload.id);
        if (editedUserIndex !== -1) {
          state.users[editedUserIndex] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
