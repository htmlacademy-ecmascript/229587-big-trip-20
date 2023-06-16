import dayjs from 'dayjs';

const sortingTime = (tripPointA, tripPointB) => {
  const deltaA = dayjs(tripPointA.timeFinish).diff(dayjs(tripPointA.timeStart));
  const deltaB = dayjs(tripPointB.timeFinish).diff(dayjs(tripPointB.timeStart));
  return deltaB - deltaA;
};

const sortingPrice = (tripPointA, tripPointB) =>
  tripPointB.price - tripPointA.price;

export { sortingTime, sortingPrice };
