import { gql } from "graphql-request";
import { ENV } from "@/constants/env";
import { graphqlClient } from "@/services/graphql-client.service";
import type { PickupPointsResponse } from "@/types/pickup-point.type";

const PICKUP_POINTS_QUERY = gql`
  query PickupPoints($id: ID!, $first: Int!) {
    session(id: $id) {
      pickupPoint {
        pickupPoints {
          points(first: $first) {
            data {
              id
              pid
              name
              type
              isAvailable
              isOpen

              address {
                country
                city
                postalCode
                addressLine1
                addressLine2
              }

              location {
                latitude
                longitude
              }

              openingHours {
                day

                start {
                  hour
                  minute
                }

                end {
                  hour
                  minute
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getPickupPoints = async () => {
  const response = await graphqlClient.request<PickupPointsResponse>(
    PICKUP_POINTS_QUERY,
    {
      id: ENV.SESSION_ID,
      first: ENV.DEFAULT_PAGE_SIZE,
    },
  );

  return response.session.pickupPoint.pickupPoints.points.data;
};
