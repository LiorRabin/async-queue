class AsyncQueue {
  constructor (fn) {
    this.queue = []
    this.running = false
    this.process = fn
  }

  isRunning () {
    return this.running
  }

  add (...args) {
    this.queue.push(args)
    if (!this.isRunning()) {
      this.running = true
      this.run()
    }
  }

  next () {
    return this.queue[0]
  }

  all () {
    return this.queue
  }

  async run () {
    try {
      await this.process(...this.next())
    } catch (err) {
      console.error(`AsyncQueue encountered an error: ${err}`)
    }
    this.queue.shift()
    if (this.next()) {
      this.run()
    } else {
      this.running = false
    }
  }
}

module.exports = AsyncQueue
