import React from 'react';
import PropTypes from 'prop-types';

import FontSelection from './FontSelection';

function TabPanel({
  content,
  isLoading,
}) {
  const isShowAsText = content && String(content.type).toLowerCase() === 'text';

  return (
    <div className="tab-panel" role="tabpanel" tabIndex="0">
      {isLoading && <p>Loading...</p>}

      {isShowAsText && (<p className="align-center">{content.content}</p>)}

      {content && !isShowAsText && <FontSelection items={content.content} />}
    </div>
  );
}

TabPanel.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  content: PropTypes.any,
  isLoading: PropTypes.bool.isRequired,
};

export default TabPanel;
