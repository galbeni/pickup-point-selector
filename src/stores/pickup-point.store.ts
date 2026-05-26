import { create } from "zustand";
import type { PickupPoint } from "@/types/pickup-point.type";

type PickupPointState = {
  activePickupPoint: PickupPoint | null;
  selectedPickupPoint: PickupPoint | null;
  setActivePickupPoint: (pickupPoint: PickupPoint | null) => void;
  setSelectedPickupPoint: (pickupPoint: PickupPoint) => void;
};

export const usePickupPointStore = create<PickupPointState>((set) => ({
  activePickupPoint: null,
  selectedPickupPoint: null,
  setActivePickupPoint: (pickupPoint) =>
    set({ activePickupPoint: pickupPoint }),
  setSelectedPickupPoint: (pickupPoint) =>
    set({ selectedPickupPoint: pickupPoint }),
}));
