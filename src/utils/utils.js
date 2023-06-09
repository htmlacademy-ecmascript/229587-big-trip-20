import dayjs from 'dayjs';

const getRandomArrayElement = (items) =>
  items[Math.floor(Math.random() * items.length)];

const getRandomInt = (max, min = 0) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const humanizeDate = (date, format) => (date ? dayjs(date).format(format) : '');

export { getRandomArrayElement, getRandomInt, humanizeDate };
