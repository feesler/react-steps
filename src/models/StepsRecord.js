/* Parse date string in format DD.MM.YYYY and return timestamp or NaN if value is incorrect */
function parseDate(value) {
  if (typeof value !== 'string') {
    return NaN;
  }

  const matches = value.match(/^(\d{2})\.(\d{2}).(\d{4})$/);
  if (!matches) {
    return NaN;
  }

  const [, ...parts] = matches;

  return Date.parse(parts.reverse().join('-'));
}

/* Parse decimal distance value and return result or NaN if value is incorrect */
function parseDistance(value) {
  const matches = value.match(/^\d+\.?\d*?$/);
  if (!matches) {
    return NaN;
  }

  return parseFloat(value);
}

export class StepsRecord {
  constructor(props) {
    Object.assign(this, {
      id: undefined,
      date: '',
      distance: ''
    }, props);
  }

  formatDate() {
    const date = new Date(this.date);
    return date.toLocaleDateString('ru-RU');
  }

  formatDistance() {
    return parseFloat(this.distance).toFixed(1);
  }

  validateDate(date) {
    const parsed = parseDate(date);
    const valid = !Number.isNaN(parsed);

    if (valid) {
      this.date = parsed;
    }

    return valid;
  }

  validateDistance(distance) {
    const parsed = parseDistance(distance);
    const valid = !Number.isNaN(distance) && distance > 0;

    if (valid) {
      this.distance = parsed;
    }

    return valid;
  }

  validate(props) {
    return {
      date: this.validateDate(props.date),
      distance: this.validateDistance(props.distance),
    };
  }
}
