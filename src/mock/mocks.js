import dayjs from 'dayjs';
import { POINT_OPTIONS, TRAVEL_POINTS, MOCK_DESCRIPTIONS, OFFERS_OPTION } from '../const.js';
import { getRandomArrayElement, getRandomInt } from '../utils.js';

const MOCKS_MIN_MINUTES = 10;
const MOCKS_MAX_MINUTES = 1000;

const MIN_PRICE = 10;
const MAX_PRICE = 200;

const DESCRIPTION_LENGTH_MAX = 5;
const PHOTOS_AMOUNT = 4;

const MAX_PHOTO_ID = 1000;

const generateDescription = () => {
  const generatedSet = new Set();
  while (generatedSet.size < getRandomInt(DESCRIPTION_LENGTH_MAX, 1)) {
    const randomSentence =
      MOCK_DESCRIPTIONS[getRandomInt(MOCK_DESCRIPTIONS.length)];
    if (!generatedSet.has(randomSentence)) {
      generatedSet.add(randomSentence);
    }
  }
  return Array.from(generatedSet).join(' ');
};

const createTimeGenerator = () => {
  let lastGeneratedTime = dayjs();
  return (minutes) => {
    lastGeneratedTime = lastGeneratedTime.add(minutes, 'm');
    return lastGeneratedTime;
  };
};

const generateTime = createTimeGenerator();

const generateMocksPhotos = () => {
  const array = [];
  for (let i = 1; i <= PHOTOS_AMOUNT; i++) {
    array.push(
      `https://loremflickr.com/248/152?random=${getRandomInt(MAX_PHOTO_ID)}`
    );
  }
  return array;
};

const generateMockTripPoint = () => ({
  type: getRandomArrayElement(POINT_OPTIONS),
  destination: {
    city: getRandomArrayElement(TRAVEL_POINTS),
    description: generateDescription(),
    photos: generateMocksPhotos(),
  },
  timeStart: generateTime(0),
  timeFinish: generateTime(getRandomInt(MOCKS_MAX_MINUTES, MOCKS_MIN_MINUTES)),
  price: getRandomInt(MAX_PRICE, MIN_PRICE),
  offers: OFFERS_OPTION.slice(getRandomInt(OFFERS_OPTION.length)),
  isFavorite: getRandomInt(1),
});

export { generateMockTripPoint };
