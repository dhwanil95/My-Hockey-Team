import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

// Define the User interface
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  city: string;
  club: string;
  rank: number;
  achievements: string;
  photo: string | File | null;
}

// Define the initial state for the users
interface UsersState {
  users: User[];
}

// Set the initial state for the users
const initialState: UsersState = {
  users: [],
};

// Create the users slice
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Add a user to the state
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    // Edit a user in the state
    editUser: (state, action: PayloadAction<User>) => {
      const { id } = action.payload;
      const index = state.users.findIndex((user) => user.id === id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    // Delete a user from the state
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

// Export the actions
export const { addUser, editUser, deleteUser } = usersSlice.actions;

// Select the users from the state
export const selectUsers = (state: RootState) => state.users.users;

// Export the reducer
export default usersSlice.reducer;
