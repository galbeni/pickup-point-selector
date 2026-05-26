export type PickupPoint = {
  id: string;
  pid: number;
  name: string;
  type: string;
  isAvailable: boolean;
  isOpen: boolean;

  address: {
    country: string;
    city: string;
    postalCode: string;
    addressLine1: string;
    addressLine2: string | null;
  };

  location: {
    latitude: number;
    longitude: number;
  };

  openingHours: {
    day: string;

    start: {
      hour: number;
      minute: number;
    };

    end: {
      hour: number;
      minute: number;
    };
  }[];
};

export type PickupPointState = {
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

export type PickupPointMapProps = {
  pickupPoints: PickupPoint[];
};

export type PickupPointsResponse = {
  session: {
    pickupPoint: {
      pickupPoints: {
        points: {
          data: PickupPoint[];
        };
      };
    };
  };
};
