import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';
import { sortDate } from '../utils/sorting.js';

export default class PointsModel extends Observable {
  #pointsApi = null;
  #tripPoints = [];
  #destinations = [];
  #offers = [];
  #isServerUnavailable = false;

  constructor({ tripPointsApiService }) {
    super();
    this.#pointsApi = tripPointsApiService;
  }

  get tripPoints() {
    return this.#tripPoints;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get tripRoute() {
    return this.#tripPoints.map((tripPoint) => tripPoint.destination.name);
  }

  get tripDates() {
    return this.#tripPoints.map((tripPoint) => tripPoint.timeStart);
  }

  get tripTotalPrice() {
    return this.#tripPoints
      .map((tripPoint) => {
        const offersPrice = tripPoint.offers.reduce(
          (accumulator, offer) => accumulator + offer.price,
          0
        );
        return tripPoint.price + offersPrice;
      })
      .reduce(
        (accumulator, tripPointSumPrice) => accumulator + tripPointSumPrice,
        0
      );
  }

  async init() {
    try {
      const tripPoints = await this.#pointsApi.tripPoints;
      this.#destinations = await this.#pointsApi.destinations;
      this.#offers = await this.#pointsApi.offers;
      this.#tripPoints = tripPoints.map((tripPoint) => {
        const offers = this.#offers.find(
          (offer) => offer.type === tripPoint.type
        );
        const adaptedTripPoint = this.#adaptToClient(
          tripPoint,
          this.#destinations,
          offers.offers
        );
        return adaptedTripPoint;
      });
    } catch (err) {
      this.#tripPoints = [];
      this.#destinations = [];
      this.#offers = [];
      this.#isServerUnavailable = true;
    }
    this._notify(UpdateType.INIT, {
      isServerUnavailable: this.#isServerUnavailable,
    });
  }

  async updateTripPoint(updateType, update) {
    const index = this.#tripPoints.findIndex(
      (tripPoint) => tripPoint.id === update.id
    );
    if (index === -1) {
      throw new Error('Can\'t update unexisting trip point');
    }
    try {
      const response = await this.#pointsApi.updateTripPoint(update);
      const updatedTripPoint = this.#adaptToClient(
        response,
        this.#destinations,
        this.#getTypeOffers(response)
      );
      this.#tripPoints = [...this.#tripPoints];
      this.#tripPoints[index] = updatedTripPoint;
      this._notify(updateType, updatedTripPoint);
    } catch (err) {
      throw new Error('Can\'t update trip point');
    }
  }

  async addTripPoint(updateType, update) {
    try {
      const response = await this.#pointsApi.addTripPoint(update);
      const newTripPoint = this.#adaptToClient(
        response,
        this.#destinations,
        this.#getTypeOffers(response)
      );
      this.#tripPoints = [newTripPoint, ...this.#tripPoints];
      this.#tripPoints.sort(sortDate);
      this._notify(updateType, newTripPoint);
    } catch (err) {
      throw new Error('Can\'t add trip point');
    }
  }

  async deleteTripPoint(updateType, update) {
    const index = this.#tripPoints.findIndex(
      (tripPoint) => tripPoint.id === update.id
    );
    if (index === -1) {
      throw new Error('Can\'t delete unexisting trip point');
    }
    try {
      await this.#pointsApi.deleteTripPoint(update);
      this.#tripPoints.splice(index, 1);
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete trip point');
    }
  }

  #getTypeOffers(response) {
    const typeOffers =
      this.#offers.find((offer) => offer.type === response.type)?.offers ?? [];
    return typeOffers;
  }

  #adaptToClient(tripPoint, destinations, offers) {
    const adaptedTripPoint = {
      ...tripPoint,
      timeStart: tripPoint['date_from'],
      timeFinish: tripPoint['date_to'],
      price: tripPoint['base_price'],
      isFavorite: tripPoint['is_favorite'],
    };
    const adaptedDestination = destinations.find(
      (destination) => destination.id === tripPoint.destination
    );
    adaptedTripPoint.destination = adaptedDestination;
    const adaptedOffers = [];
    adaptedTripPoint.offers.forEach((offerId) =>
      adaptedOffers.push(offers.find((offer) => offer.id === offerId))
    );
    adaptedTripPoint.offers = adaptedOffers;
    delete adaptedTripPoint['date_from'];
    delete adaptedTripPoint['date_to'];
    delete adaptedTripPoint['base_price'];
    delete adaptedTripPoint['is_favorite'];
    return adaptedTripPoint;
  }
}
