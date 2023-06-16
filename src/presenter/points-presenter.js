import ListView from '../view/list-view.js';
import NoPointView from '../view/no-point-view.js';
import SortView from '../view/sort-view.js';
import EventPresenter from './event-presenter.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { updateItem } from '../utils/utils.js';
import { sortingTime, sortingPrice } from '../utils/sorting.js';
import { SortingType } from '../const.js';


export default class PointsPresenter {
  #container = null;
  #tripPointsModel = null;
  #tripPoints = [];
  #tripPointsPresenters = new Map();
  #sortComponent = null;
  #pointsListComponent = new ListView();
  #noPointsComponent = new NoPointView();
  #currentSortType = SortingType.DAY;
  #sourcedTripPoints = [];

  constructor({ container, tripPointsModel }) {
    this.#container = container;
    this.#tripPointsModel = tripPointsModel;
  }

  init() {
    this.#tripPoints = [...this.#tripPointsModel.tripPoints];
    this.#sourcedTripPoints = [...this.#tripPointsModel.tripPoints];
    this.#renderPointsBoard();
  }

  #renderPointsBoard() {
    const currentFilter = document.querySelector(
      'input[name="trip-filter"]:checked'
    );
    const currentFilterPointsAmount = currentFilter.dataset.tripPointsAmount;
    if (currentFilterPointsAmount !== '0') {
      this.#renderSortComponent();
      this.#renderTripPoints();
    } else {
      this.#renderNoPointsMessage(currentFilter.value.toUpperCase());
    }
  }

  #renderNoPointsMessage(currentFilter) {
    this.#noPointsComponent.activeFilter = currentFilter;
    render(this.#noPointsComponent, this.#container);
  }

  #renderTripPoints() {
    this.#renderPointsListComponent();
    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderTripPoint(this.#tripPoints[i], this.#pointsListComponent);
    }
  }

  #renderTripPoint(tripPoint, tripPointsContainer) {
    const tripPointPresenter = new EventPresenter({
      container: tripPointsContainer,
      onDataChange: this.#handleTripPointChange,
      onModeChange: this.#handleModeChange,
    });
    tripPointPresenter.init(tripPoint);
    this.#tripPointsPresenters.set(tripPoint.id, tripPointPresenter);
  }

  #renderSortComponent() {
    this.#sortComponent = new SortView({
      sortTypes: SortingType,
      onSortTypeChange: this.#handleSortTypeChange,
      currentSorter: this.#currentSortType,
    });
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderPointsListComponent() {
    render(this.#pointsListComponent, this.#container);
  }

  #clearPointsBoard() {
    remove(this.#sortComponent);
    this.#tripPointsPresenters.forEach((presenter) => presenter.destroy());
    this.#tripPointsPresenters.clear();
  }

  #handleTripPointChange = (updatedTripPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedTripPoint);
    this.#sourcedTripPoints = updateItem(
      this.#sourcedTripPoints,
      updatedTripPoint
    );
    this.#tripPointsPresenters.get(updatedTripPoint.id).init(updatedTripPoint);
  };

  #handleModeChange = () => {
    this.#tripPointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortingType) => {
    if (this.#currentSortType === sortingType) {
      return;
    }
    this.#sortTasks(sortingType);
    this.#clearPointsBoard();
    this.#renderPointsBoard();
  };

  #sortTasks(sortingType) {
    switch (sortingType) {
      case SortingType.TIME:
        this.#tripPoints.sort(sortingTime);
        break;
      case SortingType.PRICE:
        this.#tripPoints.sort(sortingPrice);
        break;
      default:
        this.#tripPoints = [...this.#sourcedTripPoints];
    }
    this.#currentSortType = sortingType;
  }
}
