export function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}

export function isInRange(x, min, max) {
    return x >= min && x <= max;
  }