import * as ReactRedux from "react-redux";
import type { RootState, AppDispatch } from "./app/store";

export const useAppDispatch: () => AppDispatch = ReactRedux.useDispatch;
export const useAppSelector: ReactRedux.TypedUseSelectorHook<RootState> = ReactRedux.useSelector;
