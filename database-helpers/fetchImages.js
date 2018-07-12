const axios = require('axios');
var fs = require('fs');
var ans;

const addNewImagesPixalBay = async (
  topic = 'estate',
  imgCountPerRequest = 10,
  pageNum = 1,
  category = ''
) => {
  return new Promise((resolve, reject) => {
    let temp = [];
    axios
      .get(
        `https://pixabay.com/api/?key=9349748-ebe70cb7650700d70028d4ee1&page=${pageNum}&q=${topic}&orientation=horizontal&per_page=${imgCountPerRequest}&category=${category}`
      )
      .then(res => {
        res.data.hits.forEach(each => temp.push(each.webformatURL));
        ans.push(temp);
        fs.writeFile(
          './database-helpers/images.json',
          JSON.stringify(ans),
          function(err) {
            if (err) {
              return console.log(err);
            }

            console.log(
              `The file was saved! ${ans.length} batches of image stored!`
            );
            resolve();
          }
        );
      });
  });
};
const addNewImagesUnsplash = async (
  topic = 'estate',
  imgCountPerRequest = 10,
  pageNum = 1,
  category = ''
) => {
  return new Promise((resolve, reject) => {
    let temp = [];
    const url = `https://api.unsplash.com/search/photos?query=${topic}&orientation=landscape&per_page=${imgCountPerRequest}&page=${pageNum}&client_id=54008d4032d0467ec44b27e6e2ab76efbf4e6b8a449cd18ea4bf29ca9946620c`;
    axios.get(url).then(res => {
      res.data.results.forEach(each => temp.push(each.urls.regular));
      ans.push(temp);
      fs.writeFile(
        './database-helpers/images.json',
        JSON.stringify(ans),
        function(err) {
          if (err) {
            return console.log(err);
          }

          console.log(
            `The file was saved! ${ans.length} batches of image stored!`
          );
          resolve();
        }
      );
    });
  });
};

(async () => {
  try {
    ans = await require('./images.json');
    console.log(
      'Images file ./database/images.json exists or empty. Find and append new images'
    );
  } catch (error) {
    console.log(
      'Images file does not exist. Creating image file: ./database/images.json'
    );
    ans = [];
  }
  let topics = [
    'real estate',
    'beach house',
    'house'
  ];
  for (var page = 1; page <= 3; page++) {
    for (let each of topics) {
      await addNewImagesUnsplash(
        each,
        Math.floor(Math.random() * 10) + 10,
        page
      );
    }
  }
})();
