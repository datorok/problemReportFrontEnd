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
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import ProblemReportChange from './ProblemReportChange';

library.add(
  faSortAlphaDown,
  faSortAlphaUp,
  faSortNumericDown,
  faSortNumericUp,
  faMinus,
  faPlus
);

const FlexHeader = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  display: flex;
  width: 95%;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  color: #696969;
  font-size: 14px;
  /*ezzel felülbírálható a lokális formázás */
  & > * {
    font-weight: normal !important;
  }
`;
const ProblemRow = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  /* border: 1px #ccc solid; */
  display: flex;
  align-items: center;
  width: 95%;
  justify-content: space-around;
  flex-direction: row;
`;
const ProblemItem0 = styled.div`
  width: 3%;
  min-width: 3%;
  max-width: 3%;
`;
const ProblemItem1 = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  width: 10%;
  min-width: 10%;
  max-width: 10%;
  font-weight: 500;
`;
const ProblemItem2 = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  width: 14%;
  min-width: 14%;
  max-width: 14%;
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
  width: 11%;
  min-width: 11%;
  max-width: 11%;
`;
const ProblemItem6 = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  width: 40%;
  min-width: 40%;
  max-width: 40%;
  font-weight: 500;
`;

const ProblemRowContainer = styled.div`
  /* color: red; */
  padding: 10px;
`;

const ProblemContainer = styled.div`
  & ${ProblemRowContainer}:nth-child(even) {
    background: #e8e8e8 !important;
  }

  /* color: green; */
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
    <ProblemRowContainer>
      <Hidden.Container key={problemReport.id}>
        {({ visible, toggle }) => (
          <Block>
            <Hidden.Toggle
              toggle={toggle}
              style={{ width: '100%', height: 'inherit' }}
            >
              <ProblemRow className="row">
                <ProblemItem0>
                  <FontAwesomeIcon icon={visible ? 'minus' : 'plus'} />
                </ProblemItem0>
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
    </ProblemRowContainer>
  ));

  return (
    <React.Fragment>
      <FlexHeader>
        <ProblemItem0 />
        <ProblemItem1 font-weight="normal" onClick={sortOfTheLicenceNumber}>
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
        <ProblemItem6 font-weight="normal">Leírás</ProblemItem6>
      </FlexHeader>
      <ProblemContainer>{rows}</ProblemContainer>
    </React.Fragment>
  );
};

export default ProblemReport;
