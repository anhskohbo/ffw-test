import React, { createRef } from 'react';
import PropTypes from 'prop-types';

function TabList({
  tabs,
  current,
  onTabClick,
}) {
  const tabListRef = createRef();
  const tabFocus = createRef();

  tabFocus.current = 0;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role
   */
  const onNavigationTabs = (e) => {
    const tabNodes = tabListRef.current.children;

    if (e.keyCode === 39 || e.keyCode === 37) {
      tabNodes[tabFocus.current].setAttribute('tabindex', -1);

      if (e.keyCode === 39) {
        tabFocus.current += 1;
        // If we're at the end, go to the start
        if (tabFocus.current >= tabNodes.length) {
          tabFocus.current = 0;
        }
        // Move left
      } else if (e.keyCode === 37) {
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
    <div
      className="tab-list"
      role="tablist"
      ref={tabListRef}
      onKeyDown={onNavigationTabs}
    >
      {tabs.map((tab) => (
        <button
          key={`tab-${tab.id}`}
          type="button"
          role="tab"
          aria-selected={current === tab.content_endpoint}
          tabIndex="0"
          onClick={() => onTabClick(tab.content_endpoint)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

TabList.propTypes = {
  tabs: PropTypes.instanceOf(Array).isRequired,
  current: PropTypes.string,
  onTabClick: PropTypes.func,
};

TabList.defaultProps = {
  current: '',
  onTabClick: () => {},
};

export default TabList;
