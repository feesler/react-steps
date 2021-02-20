import React from 'react';
import PropTypes from 'prop-types';
import { StepsRecord } from '../../models/StepsRecord.js';
import StepsHistoryItem from '../StepsHistoryItem/StepsHistoryItem.jsx';

function StepsHistory(props) {
  const { items, onUpdate, onDelete } = props;

  const body = (items.length > 0)
    ? items.map((item) => <StepsHistoryItem key={item.date} item={item} onUpdate={onUpdate} onDelete={onDelete} />)
    : 'Нет данных';

  return (
    <div className="steps-history">
      <header className="steps-history__header">
        <div className="steps-history__header-date">Дата (ДД.ММ.ГГ)</div>
        <div className="steps-history__header-distance">Пройдено км</div>
        <div className="steps-history__header-actions">Действия</div>
      </header>
      <div className="steps-history__body">
        {body}
      </div>
    </div>
  )
}

StepsHistory.propTypes = {
  items: PropTypes.arrayOf(PropTypes.instanceOf(StepsRecord)).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default StepsHistory;

