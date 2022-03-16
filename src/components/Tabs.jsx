import React, { useContext } from 'react';
import { FontsContext } from './FontsContext';
import TabList from './TabList';
import TabPanel from './TabPanel';

function Tabs() {
  const {
    tabs,
    currentTab,
    tabContent,
    setActiveTab,
  } = useContext(FontsContext);

  return (
    <div className="tabs">
      <div className="tab-list-wrap">
        <h1 className="tabs-title">Please select one font</h1>

        <TabList
          tabs={tabs}
          current={currentTab}
          onTabClick={setActiveTab}
        />
      </div>

      <TabPanel
        content={tabContent}
        isLoading={tabContent === null}
      />
    </div>
  );
}

export default Tabs;
