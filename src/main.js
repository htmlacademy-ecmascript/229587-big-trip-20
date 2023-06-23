import FilterModel from './model/filter-model.js';
import PointsModel from './model/points-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsPresenter from './presenter/points-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';
import PointsApi from './points-api.js';

const AUTHORIZATION = 'Basic dgh5hd5d-gdghs5sh';
const END_POINT = 'https://20.ecmascript.pages.academy/big-trip';

const tripInfoElement = document.querySelector('.trip-main');
const filtersElement = document.querySelector('.trip-controls__filters');
const tripPointsElement = document.querySelector('.trip-events');

const tripPointsModel = new PointsModel({
  tripPointsApiService: new PointsApi(END_POINT, AUTHORIZATION),
});
const tripInfoPresenter = new InfoPresenter({
  container: tripInfoElement,
  tripPointsModel,
});
const filterModel = new FilterModel();
const pointsBoardPresenter = new PointsPresenter({
  container: tripPointsElement,
  tripPointsModel,
  filterModel,
});
const filterPresenter = new FilterPresenter({
  filterContainer: filtersElement,
  filterModel,
  tripPointsModel,
});

tripPointsModel.init();
tripInfoPresenter.init();
filterPresenter.init();
pointsBoardPresenter.init();
