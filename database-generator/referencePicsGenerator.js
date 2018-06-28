var fs = require('fs');
var listingName = require('../offlineData/listingsJson/listings0K-2500K.json');
var {
  getRandomDescription
} = require('../database-helpers/PicDescriptionGenerator');
var { getBatchOfImages } = require('../database-helpers/imageUrlGenerator');
function generateValuesStringsAndSaveToJson(startId = 1, endId = 500000) {
  return new Promise((resolve, reject) => {
    let str = '';
    for (var i = startId; i <= endId; i++) {
      let imageList = getBatchOfImages();
      if (i % 100000 === 0) console.log(i);
      for (var picIndex = 0; picIndex < imageList.length; picIndex++) {
        str +=
          `${i * 1000 + picIndex}, ${i}, '${getRandomDescription()}', ${
            Math.random() > 0.3 ? true : false
          }, '${imageList[picIndex]}', '${listingName[i]}'` + '\n';
      }
    }

    fs.writeFile(
      `./offlineData/refPics/refPics${Math.floor(
        startId / 1000
      )}K-${Math.floor(endId / 1000)}K.csv`,
      str,
      function(err) {
        if (err) {
          reject(err);
        }

        console.log(
          `The file was saved! ('refPics${Math.floor(
            startId / 1000
          )}K-${Math.floor(endId / 1000)}K.csv')`
        );
        resolve();
      }
    );
  });
}

(async () => {
  // await generateValuesStringsAndSaveToJson(1, 250000);
  // await generateValuesStringsAndSaveToJson(250001, 500000);
  // await generateValuesStringsAndSaveToJson(500001, 750000);
  await generateValuesStringsAndSaveToJson(750001, 1000000);
})();
