"use strict";

const { initializeHeap, pushInitialEntriesSync } = require("./sort-functions");

module.exports = (logSources, printer) => {
  let minHeap = initializeHeap();

  pushInitialEntriesSync(logSources, minHeap);

  while (!minHeap.isEmpty()) {
    // .pop() used on minHeap is a method from "heap-js" and should not be confused with logSources[index].pop()
    let { entry, index } = minHeap.pop();
    printer.print(entry);

    const nextEntry = logSources[index].pop();

    if (nextEntry) {
      minHeap.push({ entry: nextEntry, index });
    }
  }

  printer.done();
  return console.log("Sync sort complete.");
};
