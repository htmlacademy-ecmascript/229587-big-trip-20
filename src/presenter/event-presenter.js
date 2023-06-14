// import CreationView from '../view/creation-view';
import EditView from '../view/edit-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

export default class EventPresenter {
  pointsList = new ListView();

  constructor({ container, tripPointsModel }) {
    this.container = container;
    this.tripPointsModel = tripPointsModel;
  }

  init() {
    this.tripPoints = [...this.tripPointsModel.getTripPoints()];
    render(new SortView(), this.container);
    render(this.pointsList, this.container);
    render(new EditView({ tripPoint: this.tripPoints[1] }), this.pointsList.getElement());
    for (let i = 2; i < this.tripPoints.length; i++) {
      render(
        new PointView({ tripPoint: this.tripPoints[i] }),
        this.pointsList.getElement()
      );
    }
  }
}

