import React from 'react';

const ProblemReportChange = props =>
  props.problemReportChangeArr.map((problemReportChange, index) => (
    <div>
      <p>{problemReportChange.stateChangeTime}</p>
      <p>{problemReportChange.stateChangeMessage}</p>
    </div>
  ));

export default ProblemReportChange;
