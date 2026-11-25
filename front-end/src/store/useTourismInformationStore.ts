import { create } from 'zustand'
import {
  TOURISM_INFOS,
  type TourismInfoItem,
} from '@/mock/information'

interface TourismInformationStore {
  items: TourismInfoItem[]
  addItem: (item: TourismInfoItem) => void
  updateItem: (itemId: string, item: TourismInfoItem) => void
}

export const useTourismInformationStore = create<TourismInformationStore>(
  (set) => ({
    items: TOURISM_INFOS,
    addItem: (item) =>
      set((state) => ({
        items: [item, ...state.items],
      })),
    updateItem: (itemId, item) =>
      set((state) => ({
        items: state.items.map((currentItem) =>
          currentItem.id === itemId ? item : currentItem,
        ),
      })),
  }),
)
