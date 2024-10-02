import { create } from "zustand";
import { createAuthSlice } from "./slices/auth-slice";
import { createChatslice } from "./slices/chat-slice";


export const useAppStore = create()((...a) => ({
    ...createAuthSlice(...a),
    ...createChatslice(...a),
}))