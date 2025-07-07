import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/task/taskSlice";
import boardReducer from "../features/board/boardSlice";

export const store = configureStore({
  reducer: {
    board: boardReducer,
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
