"use strict";

const { Heap } = require("heap-js");

exports.comparator = (a, b) => a.entry.date - b.entry.date;

exports.initializeHeap = () => new Heap(exports.comparator);

exports.pushInitialEntriesAsync = async (logSources, minHeap) => {
  const initialEntries = await Promise.all(
    logSources.map((source) => source.popAsync()),
  );
  initialEntries.forEach((entry, index) => {
    if (entry) {
      minHeap.push({ entry, index });
    }
  });
};

exports.pushInitialEntriesSync = (logSources, minHeap) => {
  logSources.forEach((source, index) => {
    let entry = source.pop();
    if (entry) {
      minHeap.push({ entry, index });
    }
  });
};
