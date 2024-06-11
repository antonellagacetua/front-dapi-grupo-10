import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchLogin = createAsyncThunk('auth/fetchLogin',
  async (token, {rejectWithValue}) => {
    try {
      const response = await apiClient.post(`/auth/google`, {
        token,
      });
      return response.data;
    } catch (error) {
      console.error('Error attempting to sign in: ', error);
      return rejectWithValue({
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
    }
  },
);

const authReducer = createSlice({
  name: 'auth',
  initialState: {
    session: {
      jwt: null,
      appId: null,
      refreshToken: null,
    },
    user: {
      id: null,
      email: null,
    },
  },
  reducers: {
    updateRefreshToken: (state, token) => {
      state.session.refreshToken = token.payload;
    },
    updateJwt: (state, jwt) => {
      state.session.jwt = jwt.payload;
    },
    updateUserId: (state, userId) => {
      state.user.id = userId.payload;
    },
    logout: state => {
      state.session.jwt = null;
      state.session.refreshToken = null;
      state.user.id = null;
      state.user.email = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      if (action?.payload?.success === true) {
        state.session.jwt = action.payload.access_token;
        state.session.refreshToken = action.payload.refresh_token;
      }
    });

    builder.addCase(fetchLogin.rejected, state => {
      console.log('Rejected');
    });

    builder.addCase(fetchLogin.pending, state => {
      console.log('Pending');
    });
  },
});

export const {updateRefreshToken, updateJwt, updateUserId, logout} = authReducer.actions;

export default authReducer.reducer;
