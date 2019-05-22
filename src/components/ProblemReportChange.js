import React from 'react';

import {
  ProblemReportChangeRow,
  DatePart,
  TextPart,
  MarginPart,
} from './ProblemReportChange.style';

const ProblemReportChange = props =>
  props.problemReportChangeArr.map((problemReportChange, index) => (
    <div key={problemReportChange.id}>
      <ProblemReportChangeRow>
        <MarginPart />
        <DatePart>{problemReportChange.stateChangeTime}</DatePart>
        <TextPart>{problemReportChange.stateChangeMessage}</TextPart>
      </ProblemReportChangeRow>
    </div>
  ));

export default ProblemReportChange;
