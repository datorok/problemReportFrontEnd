import React from 'react';

const ProblemReportChange = props =>
  props.problemReportChangeArr.map((problemReportChange, index) => (
    <div key={problemReportChange.id}>
      <p>
        <span>{problemReportChange.stateChangeTime}</span>
        <span> </span>
        <span>{problemReportChange.stateChangeMessage}</span>
      </p>
    </div>
  ));

export default ProblemReportChange;
