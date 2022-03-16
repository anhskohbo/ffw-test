import React, { createRef, useContext } from 'react';
import PropTypes from 'prop-types';

import { FontsContext } from './FontsContext';
import FontSelectionItem from './FontSelectionItem';

function FontSelection({ items }) {
  const ref = createRef();
  const tabFocus = createRef();

  const {
    selections,
    setUserSelections,
  } = useContext(FontsContext);

  tabFocus.current = 0;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role
   */
  const onNavigation = (e) => {
    const tabNodes = ref.current.children;

    if ([37, 38, 39, 40].includes(e.keyCode)) {
      tabNodes[tabFocus.current].setAttribute('tabindex', -1);

      if (e.keyCode === 39 || e.keyCode === 40) {
        tabFocus.current += 1;
        // If we're at the end, go to the start
        if (tabFocus.current >= tabNodes.length) {
          tabFocus.current = 0;
        }
      } else if (e.keyCode === 37 || e.keyCode === 38) {
        tabFocus.current -= 1;
        // If we're at the start, move to the end
        if (tabFocus.current < 0) {
          tabFocus.current = tabNodes.length - 1;
        }
      }

      tabNodes[tabFocus.current].setAttribute('tabindex', 0);
      tabNodes[tabFocus.current].focus();
    }
  };

  return (
    <ul
      ref={ref}
      className="selections"
      onKeyDown={onNavigation}
    >
      {items.map((item, index) => (
        <FontSelectionItem
          key={item.id}
          item={item}
          index={index}
          isSelected={selections.includes(item.id)}
          onClick={() => setUserSelections(item.id)}
        />
      ))}
    </ul>
  );
}

FontSelection.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.array.isRequired,
};

export default FontSelection;
