import HeaderView from './view/header-view.js';
import FilterView from './view/filter-view.js';
import TripPointsModel from './model/point-model.js';
import EventPresenter from './presenter/event-presenter.js';
import { render, RenderPosition } from './render';

// const hederElement = bodyElement.querySelector('.page-header');
const bodyElement = document.querySelector('.page-body');
const hederElement = bodyElement.querySelector('.page-header');
const tripElement = hederElement.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');
const tripPointsElement = document.querySelector('.trip-events');
const tripPointsModel = new TripPointsModel();
const eventPresenter = new EventPresenter({
  container: tripPointsElement,
  tripPointsModel,
});

render(new FilterView(), filterElement);
render (new HeaderView(), tripElement, RenderPosition.AFTERBEGIN);

eventPresenter.init();
