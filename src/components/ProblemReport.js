import React from 'react';
import styled from 'styled-components';
import { Block, Hidden } from 'reakit';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSortAlphaDown,
  faSortAlphaUp,
  faSortNumericDown,
  faSortNumericUp,
} from '@fortawesome/free-solid-svg-icons';
import ProblemReportChange from './ProblemReportChange';

library.add(faSortAlphaDown, faSortAlphaUp, faSortNumericDown, faSortNumericUp);

const FlexHeader = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  border: 1px #ccc solid;
  display: flex;
  width: 95%;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  font-weight: bold;
  padding: 0.25em 1em;
  margin: 10px auto 0;
`;
const ProblemRow = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  border: 1px #ccc solid;
  display: flex;
  align-items: center;
  width: 95%;
  justify-content: space-around;
  flex-direction: row;
  padding: 0.25em 1em;
  margin: 10px auto 0;
`;
const ProblemItem1 = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  width: 10%;
  min-width: 10%;
  max-width: 10%;
`;
const ProblemItem2 = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  width: 12%;
  min-width: 12%;
  max-width: 12%;
`;
const ProblemItem3 = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  width: 12%;
  min-width: 12%;
  max-width: 12%;
`;
const ProblemItem4 = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  width: 10%;
  min-width: 10%;
  max-width: 10%;
`;
const ProblemItem5 = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  width: 15%;
  min-width: 15%;
  max-width: 15%;
`;
const ProblemItem6 = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  width: 41%;
  min-width: 41%;
  max-width: 41%;
`;
const ProblemReport = props => {
  const {
    problemReportArr,
    sortOfTheLicenceNumber,
    sortOfThereportCreationTime,
    licenceNumberOrderIsAscending,
    reportDateOrderIsAscending,
  } = props;
  const rows = problemReportArr.map((problemReport, index) => (
    <Hidden.Container>
      {({ visible, toggle }) => (
        <Block>
          <Hidden.Toggle toggle={toggle} style={{ width: '100%' }}>
            <ProblemRow>
              <ProblemItem1>{problemReport.licencePlateNumber}</ProblemItem1>
              <ProblemItem2>{problemReport.reportCreationTime}</ProblemItem2>
              <ProblemItem3>{problemReport.actualStatus}</ProblemItem3>
              <ProblemItem4>{problemReport.errorType}</ProblemItem4>
              <ProblemItem5>{problemReport.reporterName}</ProblemItem5>
              <ProblemItem6>
                {problemReport.problemReportChangeList[0].stateChangeMessage}
              </ProblemItem6>
            </ProblemRow>
          </Hidden.Toggle>
          <Hidden visible={visible}>
            <ProblemReportChange
              problemReportChangeArr={problemReport.problemReportChangeList}
            />
          </Hidden>
        </Block>
      )}
    </Hidden.Container>
  ));

  return (
    <React.Fragment>
      <FlexHeader>
        <ProblemItem1 onClick={sortOfTheLicenceNumber}>
          Rendszám{' '}
          <FontAwesomeIcon
            icon={
              licenceNumberOrderIsAscending
                ? 'sort-alpha-up'
                : 'sort-alpha-down'
            }
          />
        </ProblemItem1>
        <ProblemItem2 onClick={sortOfThereportCreationTime}>
          Bejelentés ideje{' '}
          <FontAwesomeIcon
            icon={
              reportDateOrderIsAscending
                ? 'sort-numeric-up'
                : 'sort-numeric-down'
            }
          />
        </ProblemItem2>
        <ProblemItem3>Aktuális státusz</ProblemItem3>
        <ProblemItem4>Hiba típusa</ProblemItem4>
        <ProblemItem5>Bejelentő</ProblemItem5>
        <ProblemItem6>Leírás</ProblemItem6>
      </FlexHeader>
      {rows}
    </React.Fragment>
  );
};

export default ProblemReport;
