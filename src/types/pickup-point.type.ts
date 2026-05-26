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
