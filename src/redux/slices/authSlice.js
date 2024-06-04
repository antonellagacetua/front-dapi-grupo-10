import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (token, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${process.env.API_URL}/auth/google`, {
        token,
      });
      return response.data;
    } catch (error) {
      console.error('Error attempting to sign in: ', error);
      return rejectWithValue(
        error.response?.data || 'Unexpected error occurred',
      );
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

export const {updateRefreshToken, updateJwt, logout} = authReducer.actions;

export default authReducer.reducer;
