import { generateMockTripPoint } from '../mock/mocks.js';

const TRIP_POINTS_AMOUNT = 7;

export default class tripPointsModel {
  tripPoints = Array.from(
    { length: TRIP_POINTS_AMOUNT },
    generateMockTripPoint
  );

  getTripPoints() {
    return this.tripPoints;
  }
}
