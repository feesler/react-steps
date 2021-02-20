import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function StepsForm(props) {
  const { item, validation, onChange, onSubmit } = props;

  const handleChange = (e) => {
    onChange({ [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  }

  const dateFeedback = (validation.date)
    ? null
    : <div className="steps-form__feedback">Неверная дата</div>;

  const distanceFeedback = (validation.distance)
    ? null
    : <div className="steps-form__feedback">Неверная дистанция</div>;

  return (
    <form className="steps-form" onSubmit={handleSubmit}>
      <div className="steps-form__field">
        <label className="steps-form__field-title" htmlFor="date-input">Дата (ДД.ММ.ГГ)</label>
        <input
          className={classNames('steps-form__input', { 'steps-form__input_invalid': !validation.date })}
          id="date-input"
          name="date"
          value={item.date}
          onChange={handleChange}
        />
        {dateFeedback}
      </div>
      <div className="steps-form__field">
        <label className="steps-form__field-title" htmlFor="distance-input">Пройдено км</label>
        <input
          className={classNames('steps-form__input', { 'steps-form__input_invalid': !validation.distance })}
          id="distance-input"
          name="distance"
          value={item.distance}
          onChange={handleChange}
        />
        {distanceFeedback}
      </div>
      <div className="steps-form__controls">
        <button className="steps-form__input steps-form__submit-btn" type="submit">OK</button>
      </div>
    </form>
  )
}

StepsForm.propTypes = {
  item: PropTypes.shape({
    date: PropTypes.string.isRequired,
    distance: PropTypes.string.isRequired,
  }).isRequired,
  validation: PropTypes.shape({
    date: PropTypes.bool.isRequired,
    distance: PropTypes.bool.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default StepsForm;
