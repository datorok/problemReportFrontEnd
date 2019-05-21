import React from 'react';
import { Block, Hidden } from 'reakit';
// a fontawesome ikonok importálása teszi lehetővé a szám- és alfanumerikus rendezés- és a sorlenyílás piktogramjának megjelenítését
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
import { ProblemContainerObject } from '../containers/ProblemContainer';
import App from '../containers/App';

import {
  Input,
  ProblemReportBlock,
  FlexHeader,
  ProblemRow,
  ProblemItem0,
  ProblemItem1,
  ProblemItem2,
  ProblemItem3,
  ProblemItem4,
  ProblemItem5,
  ProblemItem6,
  ProblemContainer,
  ProblemRowContainer,
} from './ProblemReport.style';

import ProblemReportChange from './ProblemReportChange';

library.add(
  faSortAlphaDown,
  faSortAlphaUp,
  faSortNumericDown,
  faSortNumericUp,
  faMinus,
  faPlus
);

const stateIdToStateNumber = stateID => {
  if (stateID === '0') {
    return 'Hiba bejelentve';
  }
  if (stateID === '1') {
    return 'Hibajavítás folyamatban';
  }
  if (stateID === '2') {
    return 'Várakozás információra';
  }
  if (stateID === '3') {
    return 'Szervizre rendelve';
  }
  if (stateID === '4') {
    return 'Javítás befejezve';
  }
  if (stateID === '5') {
    return 'Megválaszolva';
  }
  if (stateID === '6') {
    return 'Bejelentés kiegészítve';
  }
  if (stateID === '7') {
    return 'Szervizelés folyamatban';
  }
};

const ProblemReport = props => {
  const { ProblemReportArr } = ProblemContainerObject.state;

  const {
    licenceNumberOrderIsAscending,
    reportDateOrderIsAscending,
    licencePlateChangeHandler,
    sortMethod,
  } = props;
  const rows = ProblemContainerObject.getFilteredProblemArr2()
    // .sort()
    .map((problemReport, index) => (
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
                  <ProblemItem1>
                    {problemReport.licencePlateNumber}
                  </ProblemItem1>
                  <ProblemItem2>
                    {problemReport.reportCreationTime}
                  </ProblemItem2>
                  <ProblemItem3>
                    {stateIdToStateNumber(problemReport.actualStatus)}
                  </ProblemItem3>
                  <ProblemItem4>{problemReport.errorType}</ProblemItem4>
                  <ProblemItem5>{problemReport.reporterName}</ProblemItem5>
                  <ProblemItem6>
                    {
                      problemReport.problemReportChangeList[0]
                        .stateChangeMessage
                    }
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
    <ProblemReportBlock>
      <Input
        type="text"
        placeholder="Keresés..."
        onChange={event => licencePlateChangeHandler(event)}
      />
      <React.Fragment>
        <FlexHeader>
          <ProblemItem0 />
          <ProblemItem1
            font-weight="normal"
            onClick={() => sortMethod('alphabethical')}
          >
            Rendszám
            <FontAwesomeIcon
              icon={
                licenceNumberOrderIsAscending
                  ? 'sort-alpha-up'
                  : 'sort-alpha-down'
              }
            />
          </ProblemItem1>
          <ProblemItem2 onClick={() => sortMethod('numeric')}>
            Bejelentés ideje
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
    </ProblemReportBlock>
  );
};

export default ProblemReport;
