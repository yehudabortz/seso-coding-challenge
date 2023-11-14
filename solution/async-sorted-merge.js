"use strict";

const { initializeHeap, pushInitialEntriesAsync } = require("./sort-functions");

module.exports = (logSources, printer) => {
  return new Promise(async (resolve, reject) => {
    try {
      let minHeap = initializeHeap();

      await pushInitialEntriesAsync(logSources, minHeap);

      const fetchNextEntries = async () => {
        return Promise.all(
          logSources.map((source, index) => {
            if (source.drained) {
              return null;
            }
            return source
              .popAsync()
              .then((entry) => (entry ? { entry, index } : null));
          }),
        );
      };

      while (!minHeap.isEmpty()) {
        let { entry } = minHeap.pop();
        printer.print(entry);

        const nextEntries = await fetchNextEntries();

        nextEntries
          .filter((item) => item !== null)
          .forEach(({ entry, index }) => {
            if (entry) {
              minHeap.push({ entry, index });
            }
          });
      }

      printer.done();
      resolve(console.log("Async sort complete."));
    } catch (error) {
      console.error("An error occurred:", error);
      reject(error);
    }
  });
};
