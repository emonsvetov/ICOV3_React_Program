function numFormatter(num) {
    if (num >= 900 && num < 1000000) {
      return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num < 1000000000 && num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
    } else if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B"; // convert to M for number from > 1 million
    } else if (num < 900) {
      num = num * 1;
      return num.toFixed(1); // if value < 1000, nothing to do
    }
}

module.exports = {
    numFormatter,
}
