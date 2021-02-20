import React from 'react';
import PropTypes from 'prop-types';
import { StepsRecord } from '../../models/StepsRecord.js';

function StepsHistoryItem(props) {
  const { item, onUpdate, onDelete } = props;

  const updateItem = () => { onUpdate(item.id) };
  const deleteItem = () => { onDelete(item.id) };

  return (
    <div className="steps-history-item">
      <div className="steps-history-item__date">{item.formatDate()}</div>
      <div className="steps-history-item__distance">{item.formatDistance()}</div>
      <div className="steps-history-item__actions">
        <button className="steps-history-item__actions-button" onClick={updateItem}>✎</button>
        <button className="steps-history-item__actions-button" onClick={deleteItem}>✘</button>
      </div>
    </div>
  )
}

StepsHistoryItem.propTypes = {
  item: PropTypes.instanceOf(StepsRecord).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default StepsHistoryItem;
