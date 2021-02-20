import React, { useState } from 'react';
import StepsForm from '../StepsForm/StepsForm.jsx';
import StepsHistory from '../StepsHistory/StepsHistory.jsx';
import { StepsRecord } from '../../models/StepsRecord.js';
import { nanoid } from 'nanoid';

const initialState = {
  items: [],
  currentItem: new StepsRecord(),
  validation: { date: true, distance: true }
};

function StepsTracker() {
  const [state, setState] = useState(initialState);

  const handleSubmit = () => {
    setState((prev) => {
      const newState = {
        ...prev
      };

      const submitItem = new StepsRecord();
      newState.validation = submitItem.validate(state.currentItem);

      const valid = Object.values(newState.validation).every((val) => val);
      if (!valid) {
        return newState;
      }

      submitItem.id = (prev.currentItem.id) ? prev.currentItem.id : nanoid();

      newState.items = prev.items
        .filter((item) => item.id !== submitItem.id)
        .map((item) => new StepsRecord(item));
      newState.currentItem = new StepsRecord();

      /**
       * Check record with the same date:
       * In case there is already a record with the same date then add distance
       * In other case append record to the list
       */
      const sameDateItem = newState.items.find((item) => item.date === submitItem.date);
      if (sameDateItem) {
        sameDateItem.distance += submitItem.distance;
      } else {
        newState.items.push(submitItem);
      }

      newState.items.sort((a, b) => b.date - a.date);

      return newState;
    });
  }

  const handleChange = (change) => {
    setState((prev) => {
      const newState = {
        ...prev,
        currentItem: { ...prev.currentItem, ...change }
      };

      return newState;
    });
  };

  const handleUpdate = (id) => {
    setState((prev) => {
      const itemToUpdate = prev.items.find((item) => item.id === id);

      if (!itemToUpdate) {
        return prev;
      }

      return {
        ...prev,
        currentItem: {
          id: itemToUpdate.id,
          date: itemToUpdate.formatDate(),
          distance: itemToUpdate.formatDistance()
        }
      };
    });
  }

  const handleDelete = (id) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id)
    }));
  }

  return (
    <div className="steps-tracker">
      <StepsForm
        item={state.currentItem}
        validation={state.validation}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <StepsHistory
        items={state.items}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default StepsTracker;
