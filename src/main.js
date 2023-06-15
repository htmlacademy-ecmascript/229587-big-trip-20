import FilterView from './view/filter-view.js';
import HeaderView from './view/header-view.js';
import TripPointsModel from './model/point-model.js';
import PointsPresenter from './presenter/points-presenter.js';
import { generateFilter } from './mock/filter.js';
import { generateMockTripPoint } from './mock/mocks.js';
import { getRandomInt } from './utils/utils.js';
import { render, RenderPosition } from './framework/render.js';

const TRIP_POINTS_AMOUNT = 10;

const mockTripPoints = Array.from(
  { length: getRandomInt(TRIP_POINTS_AMOUNT) },
  generateMockTripPoint
);

const bodyElement = document.querySelector('.page-body');
const hederElement = bodyElement.querySelector('.page-header');
const tripElement = hederElement.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');
const tripPointsElement = document.querySelector('.trip-events');
const tripPointsModel = new TripPointsModel({ tripPoints: mockTripPoints });
const pointsPresenter = new PointsPresenter({
  container: tripPointsElement,
  tripPointsModel,
});

const filters = generateFilter(tripPointsModel.tripPoints);

render(new FilterView({ filters }), filterElement);
render(new HeaderView(), tripElement, RenderPosition.AFTERBEGIN);

pointsPresenter.init();
