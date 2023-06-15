import AbstractView from '../framework/view/abstract-view.js';

const createSortItem = (sortingType, isChecked) => `
<div class="trip-sort__item  trip-sort__item--${sortingType}">
<input
  id="sort-${sortingType}"
  class="trip-sort__input  visually-hidden"
  type="radio"
  name="trip-sort"
  value="sort-${sortingType}"
  ${isChecked ? 'checked' : ''}
  ${sortingType === 'event' || sortingType === 'offers' ? 'disabled' : ''}
>
<label
  class="trip-sort__btn"
  for="sort-${sortingType}"
  data-sort-type="${sortingType}"
>
  ${sortingType.charAt(0).toUpperCase() + sortingType.slice(1)}
</label>
</div>
`;

const createSortTemplate = (sortingTypes, currentSorter) => {
  const sortItemsTemplate = Object.values(sortingTypes)
    .map((sortingType) => createSortItem(sortingType, sortingType === currentSorter))
    .join('');
  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>
  `;
};

export default class SortView extends AbstractView {
  #sortingTypes = null;
  #handleSortingTypeChange = null;
  #currentSorter = 'day';

  constructor({ sortTypes, onSortTypeChange, currentSorter }) {
    super();
    this.#sortingTypes = sortTypes;
    this.#handleSortingTypeChange = onSortTypeChange;
    this.#currentSorter = currentSorter;
    this.element.addEventListener('click', this.#sortingTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#sortingTypes, this.#currentSorter);
  }

  #sortingTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }
    evt.preventDefault();
    this.#handleSortingTypeChange(evt.target.dataset.sortType);
  };
}
