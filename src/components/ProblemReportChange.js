import React from 'react';
import moment from 'moment';

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
        <DatePart>
          {moment(problemReportChange.stateChangeTime).format(
            'YYYY MM DD hh:mm'
          )}
        </DatePart>
        <TextPart>{problemReportChange.stateChangeMessage}</TextPart>
      </ProblemReportChangeRow>
    </div>
  ));

export default ProblemReportChange;
