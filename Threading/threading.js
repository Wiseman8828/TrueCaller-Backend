const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  // This code runs in the main thread
  const worker = new Worker(__filename, {
    workerData: { input: 'some data' }
  });

  worker.on('message', (message) => {
    console.log('Received message from worker:', message);
  });

  worker.on('error', (error) => {
    console.error('Error in worker:', error);
  });

  worker.on('exit', (code) => {
    if (code !== 0)
      console.error('Worker stopped with exit code', code);
  });
} else {
  // This code runs in the worker thread
  const { input } = workerData;
  console.log('Received data in worker:', input);

  // Perform some CPU-intensive task
  const result = performSomeTask(input);

  // Send result back to the main thread
  parentPort.postMessage(result);
}

function performSomeTask(data) {
  // Perform CPU-intensive task here
  return data.toUpperCase();
}
