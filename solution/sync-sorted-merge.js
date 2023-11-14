"use strict";

const { Heap } = require("heap-js");
const processLogEntries = require("./process-log-entries");

module.exports = (logSources, printer) => {
  const comparator = (a, b) => a.entry.date - b.entry.date;
  let minHeap = new Heap(comparator);

  logSources.forEach((source, index) => {
    let entry = source.pop();

    if (entry) {
      minHeap.push({ entry, index });
    }
  });

  processLogEntries(logSources, printer, minHeap);
  return console.log("Sync sort complete.");
};
