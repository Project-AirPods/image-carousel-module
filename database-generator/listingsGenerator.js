var fs = require('fs');
var {
  generateListingName
} = require('../database-helpers/listingNameGenerator');

function generateValuesStringsAndSaveToJson(
  startId = 1,
  endId = 500000,
  table = 'listings'
) {
  return new Promise((resolve, reject) => {
    let str = '';
    let ans = {};
    for (var i = startId; i <= endId; i++) {
      if (i % 500000 === 0) console.log('i', i);
      var listingName = generateListingName();
      str += `${i}, '${listingName}'`+'\n';
      ans[i] = listingName;
    }

    fs.writeFile(
      `./offlineData/listings/listings${Math.floor(
        startId / 1000
      )}K-${Math.floor(endId / 1000)}K.csv`,
      str,
      function(err) {
        if (err) {
          reject(err);
        }

        console.log(
          `The file was saved! ('/offlineData/listings/listings${Math.floor(
            startId / 1000
          )}K-${Math.floor(endId / 1000)}K.csv')`
        );

      }
    );

    fs.writeFile(
      `./offlineData/listingsJson/listings${Math.floor(
        startId / 1000
      )}K-${Math.floor(endId / 1000)}K.json`,
      JSON.stringify(ans),
      function(err) {
        if (err) {
          reject(err);
        }

        console.log(
          `The file was saved! ('/offlineData/listingsJson/listings${Math.floor(
            startId / 1000
          )}K-${Math.floor(endId / 1000)}K.csv')`
        );
        resolve();
      }
    );
  });
}

(async () => {
  // await generateValuesStringsAndSaveToJson(1, 10);
  // await generateValuesStringsAndSaveToJson(1, 2500000);
  // await generateValuesStringsAndSaveToJson(2500001, 5000000);
  await generateValuesStringsAndSaveToJson(5000001, 7500000);
  await generateValuesStringsAndSaveToJson(7500001, 10000000);
})();
