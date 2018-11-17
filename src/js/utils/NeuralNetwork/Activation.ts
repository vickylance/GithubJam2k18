export default abstract class Activations {
  // Range (0, 1)
  public static sigmoid(x: number, derivative: boolean = false): number {
    if (!derivative) {
      return 1 / (1 + Math.exp(-x));
    }
    return x * (1 - x);
  }

  // Range [0, INFINITY)
  public static relu(x: number, derivative: boolean = false): number {
    if (!derivative) {
      return x < 0 ? 0 : x;
    }
    return x < 0 ? 0 : 1;
  }

  //
  public static swish(x: number, derivative: boolean = false): number {
    if (!derivative) {
      return x * Activations.sigmoid(x);
    }
  }

  // Range (-1, 1)
  public static tanh(x: number, derivative: boolean = false): number {
    if (!derivative) {
      return Math.tanh(x);
    }
    return 1 - x * x;
  }

  // Range (-PI/2, PI/2)
  public static arctan(x: number, derivative: boolean = false): number {
    if (!derivative) {
      return Math.atan(x);
    }
    return 1 / (x ** 2 + 1);
  }

  // Range (-INFINITY, INFINITY)
  public static leakyRelu(x: number, derivative: boolean = false): number {
    const a: number = 0.01;
    if (!derivative) {
      return x < 0 ? a * x : x;
    }
    return x < 0 ? a : 1;
  }

  // Range (-1, 1)
  public static softsign(x: number, derivative: boolean = false): number {
    if (!derivative) {
      return x / (1 + Math.abs(x));
    }
    return 1 / (Math.abs(x) + 1) ** 2;
  }

  // Range (0, INFINITY)
  public static softplus(x: number, derivative: boolean = false): number {
    if (!derivative) {
      return Math.log(1 + Math.exp(x));
    }
    return 1 / (1 + Math.exp(-x));
  }

  public static softMax(x: number, derivative: boolean = false): number {
    if (!derivative) {
      return (
        Math.exp(x[index]) / x.map(y => Math.exp(y)).reduce((a, b) => a + b)
      );
    }
  }

  // Range (0, 1]
  public static gaussian(x: number, derivative: boolean = false): number {
    if (!derivative) {
      return Math.exp(-1 * (x * x));
    }
    return -2 * x * Math.exp(-1 * (x * x));
  }

  // https://arxiv.org/pdf/1706.02515.pdf
  public static selu(x: number, derivative: boolean = false): number {
    const alpha = 1.6732632423543772848170429916717;
    const scale = 1.0507009873554804934193349852946;
    const fx = x > 0 ? x : alpha * Math.exp(x) - alpha;
    if (derivate) {
      return x > 0 ? scale : (fx + alpha) * scale;
    }
    return fx * scale;
  }

  public static;
}
