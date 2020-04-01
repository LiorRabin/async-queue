# AsyncQueue

AsyncQueue module used for running asynchronous tasks in series

## Install

```
npm i @liorrabin/async-queue
```

## Test
```
npm test
```

## Usage

```
const AsyncQueue = require('@liorrabin/async-queue')

const queue = new AsyncQueue(fn) // create new queue with `fn` as the function to run on each task
queue.add('param1', 'param2')    // add fn('param1', 'param2') to queue and start running immediately
queue.isRunning()                // check if queue is currently running
queue.next()                     // get next task to run
queue.all()                      // get all tasks in the queue
```

## License
[MIT](LICENSE)