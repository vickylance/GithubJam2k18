const Activations = {
  // Range (0, 1)
  sigmoid: (x, derivative = false) => {
    if (!derivative) {
      return 1 / (1 + Math.exp(-x));
    }
    return x * (1 - x);
  },

  // Range [0, INFINITY)
  relu: (x, derivative = false) => {
    if (!derivative) {
      return x < 0 ? 0 : x;
    }
    return x < 0 ? 0 : 1;
  },

  swish: (x, derivative = false) => {
    if (!derivative) {
      return x * Activations.sigmoid(x);
    }
  },

  // Range (-1, 1)
  tanh: (x, derivative = false) => {
    if (!derivative) {
      return Math.tanh(x);
    }
    return 1 - x * x;
  },

  // Range (-PI/2, PI/2)
  arctan: (x, derivative = false) => {
    if (!derivative) {
      return Math.atan(x);
    }
    return 1 / ((x ** 2) + 1);
  },

  // Range (-INFINITY, INFINITY)
  leakyRelu: (x, derivative = false) => {
    if (!derivative) {
      return x < 0 ? 0.01 * x : x;
    }
    return x < 0 ? 0.01 : 1;
  },

  // Range (-1, 1)
  softsign: (x, derivative = false) => {
    if (!derivative) {
      return x / (1 + Math.abs(x));
    }
    return 1 / ((Math.abs(x) + 1) ** 2);
  },

  // Range (0, INFINITY)
  softplus: (x, derivative = false) => {
    if (!derivative) {
      return Math.log(1 + Math.exp(x));
    }
    return 1 / (1 + Math.exp(-x));
  },

  softMax: x => index =>
    Math.exp(arr[index]) / arr.map(y => Math.exp(y)).reduce((a, b) => a + b),

  // Range (0, 1]
  gaussian: (x, derivative = false) => {
    if (!derivative) {
      return Math.exp(-1 * (x * x));
    }
    return -2 * x * Math.exp(-1 * (x * x));
  },
};

export default Activations;