'use client'

import { create } from 'zustand'

import { CHAT_LIST_UI, UIState } from '@/features/chat-bot/type'

interface ChatUIListState {
  uiList: CHAT_LIST_UI
  add: (ui: UIState | UIState[]) => void
  replace: (id: string, newUi: Omit<UIState, 'id'>) => void
}

export const useChatUIListStore = create<ChatUIListState>()((set) => ({
  uiList: [],
  add: (ui) =>
    set((state) => {
      if (Array.isArray(ui)) return { uiList: [...state.uiList, ...ui] }
      else return { uiList: [...state.uiList, ui] }
    }),
  replace: (id, newUi: Omit<UIState, 'id'>) =>
    set((state) => ({
      uiList: state.uiList.map((item) =>
        item.id === id ? { id, ...newUi } : item,
      ),
    })),
}))
