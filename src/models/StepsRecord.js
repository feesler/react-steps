/* Parse date string in DD.MM.YY or DD.MM.YYYY format and return timestamp or NaN if value is incorrect */
function parseDate(value) {
  if (typeof value !== 'string') {
    return NaN;
  }

  const matches = value.match(/^(\d{2})\.(\d{2}).(\d{2}|\d{4})$/);
  if (!matches) {
    return NaN;
  }

  let [, day, month, year] = matches;
  day = parseInt(day, 10);
  month = parseInt(month, 10) - 1;
  year = parseInt(year, 10);
  // Assume for two digits year its 2000 and later, not 1900-1999
  if (year < 100) {
    year += 2000;
  }

  const date = new Date(year, month, day);
  if (
    date.getDate() !== day
    || date.getMonth() !== month
    || date.getFullYear() !== year
  ) {
    return NaN;
  }

  return date.getTime();
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
