const images = require('./images.json');
const numOfBatches = images.length;
const getBatchOfImages = () => {
  return images[Math.floor(Math.random() * numOfBatches)];
};

module.exports = { getBatchOfImages };