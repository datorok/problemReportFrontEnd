import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { ClimbingBoxLoader } from 'react-spinners';
import ProblemContainer, {
  ProblemContainerObject,
} from '../containers/ProblemContainer';
import {
  AnimationLoader,
  ProblemReportChangeRow,
  DatePart,
  TextPart,
  MarginPart,
} from './ProblemReportChange.style';

const ProblemReportChange = props => {
  const [problemReportChangeArr, setproblemReportChangeArr] = useState(
    undefined
  );

  useEffect(() => {
    const { problemReportIdForPRC } = props;
    console.log('problemReportIdForPRC: ');
    console.log(problemReportIdForPRC);
    ProblemContainerObject.fetchChangeList(problemReportIdForPRC).then(
      dataFromDb => setproblemReportChangeArr(dataFromDb)
    );
  }, [props, props.problemReportIdForPRC]);

  console.log(`problemReportChangeArr in component:`);
  console.log(problemReportChangeArr);

  if (!Array.isArray(problemReportChangeArr)) {
    return (
      <AnimationLoader>
        <ClimbingBoxLoader sizeUnit="px" size={30} color="#ffa500" />
      </AnimationLoader>
    );
  }
  return problemReportChangeArr.map(problemReportChange => (
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
};
export default ProblemReportChange;
