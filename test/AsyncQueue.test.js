const assert = require('assert')
const AsyncQueue = require('../src/AsyncQueue')

const testFn = (k, v) => new Promise(resolve => { setTimeout(() => { resolve({ k, v }) }, 1e3) })

describe('AsyncQueue', () => {
  const queue = new AsyncQueue(testFn)
  it('should add a task to the queue', () => {
    queue.add('a', 1)
    assert.deepStrictEqual(queue.next(), ['a', 1])
    assert.deepStrictEqual(queue.isRunning(), true)
    assert.strictEqual(queue.all().length, 1)
    assert.deepStrictEqual(queue.all(), [['a', 1]])
  })
  it('should add a 2nd task to the queue', () => {
    queue.add('b', 2)
    assert.deepStrictEqual(queue.next(), ['a', 1])
    assert.deepStrictEqual(queue.isRunning(), true)
    assert.strictEqual(queue.all().length, 2)
    assert.deepStrictEqual(queue.all(), [['a', 1], ['b', 2]])
  })
  it('should add a 3rd task to the queue', () => {
    queue.add('c', 3)
    assert.deepStrictEqual(queue.next(), ['a', 1])
    assert.deepStrictEqual(queue.isRunning(), true)
    assert.strictEqual(queue.all().length, 3)
    assert.deepStrictEqual(queue.all(), [['a', 1], ['b', 2], ['c', 3]])
  })
  it('should finish all tasks', (done) => {
    setTimeout(() => {
      assert.strictEqual(queue.all().length, 0)
      assert.deepStrictEqual(queue.isRunning(), false)
      done()
    }, 4e3)
  })
})
