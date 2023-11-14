module.exports = async (logSources, printer, minHeap, async = false) => {
  while (!minHeap.isEmpty()) {
    // .pop() used on minHeap is a method from "heap-js" and should not be confused with
    let { entry, index } = minHeap.pop();
    printer.print(entry);

    const nextEntry = async
      ? await logSources[index].popAsync()
      : logSources[index].pop();
    if (nextEntry) {
      minHeap.push({ entry: nextEntry, index });
    }
  }

  printer.done();
};
