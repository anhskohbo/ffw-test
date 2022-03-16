import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import { useLocalStorage } from '../hooks/useStorage';
import { fetchTabs, fetchTabData } from '../api';

export const FontsContext = createContext({});

const cachedResponse = {};

export function FontsProvider({ children }) {
  const [tabs, setTabs] = useState([]);
  const [tabContent, setTabContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useLocalStorage('currentTab');
  const [selections, setSelections] = useLocalStorage('selections', []);

  const setActiveTab = useMemo(() => async (tab) => {
    setCurrentTab(tab);

    if (cachedResponse[tab]) {
      setTabContent(cachedResponse[tab]);
      return;
    }

    setTabContent(null);
    fetchTabData(tab).then((data) => {
      setTabContent(data);

      cachedResponse[tab] = data;
    });
  }, []);

  const setUserSelections = useMemo(() => async (userSelection) => {
    if (selections.includes(userSelection)) {
      setSelections(selections.filter((selection) => selection !== userSelection));
      return;
    }

    setSelections([...selections, userSelection]);
  }, [selections]);

  const value = useMemo(
    () => ({
      tabs,
      currentTab,
      tabContent,
      setActiveTab,

      selections,
      setUserSelections,
    }),
    [tabs, currentTab, tabContent, selections],
  );

  useEffect(() => {
    setIsLoading(true);

    fetchTabs().then((_tabs) => {
      setTabs(_tabs);

      if (!_tabs.find((tab) => tab.content_endpoint === currentTab)) {
        setCurrentTab(_tabs[0].content_endpoint);
      }
    }).finally(() => setIsLoading(false));

    if (currentTab) {
      setActiveTab(currentTab);
    }
  }, []);

  return (
    <FontsContext.Provider value={value}>
      {isLoading && <div className="is-loading">Loading...</div>}

      {!isLoading && children}
    </FontsContext.Provider>
  );
}

FontsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
