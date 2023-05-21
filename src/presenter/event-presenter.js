import EditView from '../view/edit-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';

const POINT_COUNT = 3;

export default class EventPresenter {
  sortComponent = new SortView();
  listComponent = new ListView();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(this.sortComponent, this.container);
    render(this.listComponent, this.container);

    render(new EditView(), this.listComponent.getElement());

    for (let i = 0; i < POINT_COUNT; i++) {
      render(new PointView(), this.listComponent.getElement());
    }
  }
}
