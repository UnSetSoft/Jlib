class Random {
  constructor(seed = Date.now()) {
    this.backend = null;

    if (typeof globalThis.crypto?.getRandomValues === "function") {
      this.backend = "browser";
    } else if (typeof require !== "undefined") {
      try {
        this.nodeCrypto = require("crypto");
        if (typeof this.nodeCrypto.randomBytes === "function") {
          this.backend = "node";
        }
      } catch {
        this.backend = null;
      }
    }

    if (!this.backend) {
      this.backend = "lcg";
      this._lcgSeed = seed >>> 0;
    }
  }

  _u32() {
    if (this.backend === "browser") {
      const arr = new Uint32Array(1);
      crypto.getRandomValues(arr);
      return arr[0];
    } else if (this.backend === "node") {
      return this.nodeCrypto.randomBytes(4).readUInt32LE();
    } else {
      // LCG fallback
      this._lcgSeed = (1664525 * this._lcgSeed + 1013904223) >>> 0;
      return this._lcgSeed;
    }
  }

  random() {
    return this._u32() / 0xffffffff;
  }

  int(min, max, step = 1) {
    const range = Math.floor((max - min) / step) + 1;
    return min + step * (this._u32() % range);
  }

  boolean(prob = 0.5) {
    return this.random() < prob;
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = this._u32() % (i + 1);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  toShuffled(array) {
    return this.shuffle([...array]);
  }

  take(array, n) {
    return this.toShuffled(array).slice(0, n);
  }

  sample(array, options = {}) {
    const { weights } = options;
    if (!weights) {
      return array[this._u32() % array.length];
    }

    const total = weights.reduce((a, b) => a + b, 0);
    let threshold = this.random() * total;

    for (let i = 0; i < array.length; i++) {
      if (threshold < weights[i]) return array[i];
      threshold -= weights[i];
    }
  }

  bytes(n) {
    const buf = new Uint8Array(n);
    this.fillBytes(buf);
    return buf;
  }

  fillBytes(buf) {
    if (this.backend === "browser") {
      crypto.getRandomValues(buf);
    } else if (this.backend === "node") {
      const bytes = this.nodeCrypto.randomBytes(buf.length);
      for (let i = 0; i < buf.length; i++) buf[i] = bytes[i];
    } else {
      // LCG fallback
      for (let i = 0; i < buf.length; i++) {
        buf[i] = this._u32() & 0xff;
      }
    }
  }

  getBackend() {
    return this.backend;
  }
}

export default Random;
