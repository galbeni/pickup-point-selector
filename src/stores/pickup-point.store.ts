import { create } from "zustand";
import type { PickupPoint } from "@/types/pickup-point.type";

type PickupPointState = {
  activePickupPoint: PickupPoint | null;
  selectedPickupPoint: PickupPoint | null;
  mapTarget: null | {
    lat: number;
    lng: number;
    label: string;
  };
  setActivePickupPoint: (pickupPoint: PickupPoint | null) => void;
  setSelectedPickupPoint: (pickupPoint: PickupPoint) => void;
  setMapTarget: (target: PickupPointState["mapTarget"]) => void;
  clearMapTarget: () => void;
};

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
