import * as Toolkit from "@reduxjs/toolkit";
import axios from "axios";
import type { TaskType } from "../../types";

const API = `${import.meta.env.VITE_API_URL}/tasks`;

export const fetchTasks = Toolkit.createAsyncThunk(
  "tasks/fetchTasks",
  async (boardId: string) => {
    const res = await axios.get(`${API}/${boardId}`);
    return res.data as TaskType[];
  }
);

export const createTask = Toolkit.createAsyncThunk(
  "tasks/createTask",
  async ({ boardId, task }: { boardId: string; task: Omit<TaskType, "_id"> }) => {
      try{
    const res = await axios.post(`${API}/${boardId}`, task);
    return res.data as TaskType;
    } catch (err: any) {
      console.error("Error creating task:", err.message, err.stack);
       throw err;
    }
  }
);

export const reorderTasks = Toolkit.createAsyncThunk(
  "tasks/reorderTasks",
  async (tasks: { _id: string; order: number }[]) => {
  await axios.put(`${API}/reorder`, { tasks });
    return tasks;
  }
);

export const updateTask = Toolkit.createAsyncThunk(
  "tasks/updateTask",
  async ({ id, data }: { id: string; data: Partial<TaskType> }) => {
    const res = await axios.put(`${API}/${id}`, data);
    return res.data as TaskType;
  }
);

export const deleteTask = Toolkit.createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    await axios.delete(`${API}/${id}`);
    return id;
  }
);

type TaskState = {
  tasks: TaskType[];
  loading: boolean;
  activeTask: TaskType | null;
};

const initialState: TaskState = {
  tasks: [],
  loading: false,
  activeTask: null,
};

const taskSlice = Toolkit.createSlice({
  name: "task",
  initialState,
  reducers: {
    setActiveTask: (state, action: Toolkit.PayloadAction<TaskType | null>) => {
      state.activeTask = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action: Toolkit.PayloadAction<TaskType[]>) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(createTask.fulfilled, (state, action: Toolkit.PayloadAction<TaskType>) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: Toolkit.PayloadAction<TaskType>) => {
        const idx = state.tasks.findIndex((t) => t._id === action.payload._id);
        if (idx !== -1) state.tasks[idx] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action: Toolkit.PayloadAction<string>) => {
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      })
      .addCase(reorderTasks.fulfilled, (state, action) => {
        for (const updated of action.payload) {
          const task = state.tasks.find((t) => t._id === updated._id);
          if (task) task.order = updated.order;
        }
      });

  },
});

export const { setActiveTask } = taskSlice.actions;
export default taskSlice.reducer;
