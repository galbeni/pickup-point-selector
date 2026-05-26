import { create } from "zustand";
import type { PickupPointState } from "@/types/pickup-point.type";

export const usePickupPointStore = create<PickupPointState>((set) => ({
  activePickupPoint: null,
  selectedPickupPoint: null,
  mapTarget: null,
  setActivePickupPoint: (pickupPoint) =>
    set({ activePickupPoint: pickupPoint }),
  setSelectedPickupPoint: (pickupPoint) =>
    set({ selectedPickupPoint: pickupPoint }),
  setMapTarget: (target) => set({ mapTarget: target }),
  clearMapTarget: () => set({ mapTarget: null }),
}));
