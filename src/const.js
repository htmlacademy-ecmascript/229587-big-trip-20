export const TRAVEL_POINTS = [
  'Amsterdam',
  'Chamonix',
  'Geneva',
  'New York',
  'Moscow',
  'Irkutsk',
  'Bangkok',
  'Denpasar',
  'Tokyo',
  'Kioto',
  'Havana',
  'Seoul',
  'Beijing',
  'Minsk',
  'Saint Petersburg',
];

export const POINT_OPTIONS = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

export const OFFERS_OPTION = [
  {
    type: 'comfort',
    title: 'Switch to comfort class',
    price: 100,
  },
  {
    type: 'luggage',
    title: 'Add luggage',
    price: 30,
  },
  {
    type: 'meal',
    title: 'Add meal',
    price: 15,
  },
  {
    type: 'seats',
    title: 'Choose seats',
    price: 5,
  },
  {
    type: 'train',
    title: 'Travel by train',
    price: 50,
  },
];

export const MOCK_DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const FilterTypeMessages = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PRESENT: 'There are no present events now',
  PAST: 'There are no past events now',
};

const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';
const TIME_DELTA_FORMAT = 'DD[D] HH[H] mm[M]';
const DATETIME_FORM_FORMAT = 'DD/MM/YY HH:mm';

export const SortingType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

export {
  DATE_FORMAT,
  TIME_FORMAT,
  TIME_DELTA_FORMAT,
  DATETIME_FORM_FORMAT,
};
