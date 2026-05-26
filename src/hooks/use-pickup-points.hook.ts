import { useQuery } from "@tanstack/react-query";
import { getPickupPoints } from "@/services/pickup-points.service";

export const usePickupPoints = () => {
  return useQuery({
    queryKey: ["pickup-points"],
    queryFn: getPickupPoints,
  });
};
