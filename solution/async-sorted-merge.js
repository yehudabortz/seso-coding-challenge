"use strict";

const { Heap } = require("heap-js");
const processLogEntries = require("./process-log-entries");

module.exports = (logSources, printer) => {
  return new Promise(async (resolve, reject) => {
    try {
      const comparator = (a, b) => a.entry.date - b.entry.date;
      let minHeap = new Heap(comparator);

      for (const index in logSources) {
        let entry = await logSources[index].popAsync();
        if (entry) {
          minHeap.push({ entry, index });
        }
      }

      await processLogEntries(logSources, printer, minHeap, true);

      resolve(console.log("Async sort complete."));
    } catch (error) {
      console.error("An error occurred:", error);
      reject(error);
    }
  });
};
