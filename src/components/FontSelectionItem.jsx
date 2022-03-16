import React from 'react';
import PropTypes from 'prop-types';

function FontSelection({
  item,
  index,
  isSelected,
  onClick,
}) {
  const onEnterPress = (e, id) => {
    if (e.key === 'Enter') {
      onClick(id);
    }
  };

  return (
    <li
      tabIndex="0"
      data-index={index}
      aria-label={item['color-blind-label']}
      aria-selected={isSelected}
      className={`selection ${isSelected ? 'is-selected' : ''}`}
      onClick={onClick}
      onKeyDown={(e) => onEnterPress(e, item.id)}
    >
      <div
        className="selection__box"
        style={{ backgroundColor: item.color }}
      >
        <span>{item.abbr}</span>
      </div>

      <strong>{item.label}</strong>
    </li>
  );
}

FontSelection.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FontSelection;
