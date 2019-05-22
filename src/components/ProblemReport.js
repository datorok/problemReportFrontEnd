import React, { useState } from 'react';
import { Block, Hidden } from 'reakit';
import moment from 'moment';
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
  const [
    licenceNumberOrderIsAscending,
    setLicenceNumberOrderIsAscending,
  ] = useState(undefined);

  const [reportDateOrderIsAscending, setReportDateOrderIsAscending] = useState(
    undefined
  );

  const [licenceNumberToFilter, setLicenceNumberToFilter] = useState('');

  const rows = ProblemContainerObject.getFilteredProblemArr2()
    .filter(problemReport =>
      problemReport.licencePlateNumber
        .substring(0, 7)
        .toUpperCase()
        .includes(licenceNumberToFilter.toUpperCase())
    )
    .sort(function(a, b) {
      const ad = moment(a.reportCreationTime);
      const bd = moment(b.reportCreationTime);
      if (licenceNumberOrderIsAscending !== undefined) {
        if (licenceNumberOrderIsAscending) {
          if (
            a.licencePlateNumber.toLowerCase() <
            b.licencePlateNumber.toLowerCase()
          )
            return 1;
          return -1;
        }
        if (
          a.licencePlateNumber.toLowerCase() <
          b.licencePlateNumber.toLowerCase()
        )
          return -1;
        return 1;
      }
      if (reportDateOrderIsAscending !== undefined) {
        if (reportDateOrderIsAscending) {
          if (ad < bd) return 1;
          return -1;
        }
        if (ad < bd) return -1;
        return 1;
      }
      return 0;
    })
    .map((problemReport, index) => (
      <ProblemRowContainer>
        <Hidden.Container key={problemReport.id}>
          {({ visible, toggle }) => (
            <Block>
              <Hidden.Toggle
                toggle={toggle}
                style={{ width: '100%', height: 'inherit' }}
              >
                <ProblemRow key={index}>
                  <ProblemItem0>
                    <FontAwesomeIcon icon={visible ? 'minus' : 'plus'} />
                  </ProblemItem0>
                  <ProblemItem1>
                    {problemReport.licencePlateNumber}
                  </ProblemItem1>
                  <ProblemItem2 key={index}>
                    {moment(problemReport.reportCreationTime).format(
                      'YYYY MM DD '
                    )}
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
        onChange={event => setLicenceNumberToFilter(event.target.value)}
      />
      <React.Fragment>
        <FlexHeader>
          <ProblemItem0 />
          <ProblemItem1
            key={1}
            font-weight="normal"
            onClick={() => {
              setLicenceNumberOrderIsAscending(!licenceNumberOrderIsAscending);
              setReportDateOrderIsAscending(undefined);
            }}
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
          <ProblemItem2
            key={2}
            onClick={() => {
              setReportDateOrderIsAscending(!reportDateOrderIsAscending);
              setLicenceNumberOrderIsAscending(undefined);
            }}
          >
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
