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
  ProblemItemPlusOrMinus,
  ProblemItemLicencePlateNumber,
  ProblemItemReportCreationTime,
  ProblemItemActualStatus,
  ProblemItemErrorType,
  ProblemItemReporterName,
  ProblemItemDescription,
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
                  <ProblemItemPlusOrMinus>
                    <FontAwesomeIcon icon={visible ? 'minus' : 'plus'} />
                  </ProblemItemPlusOrMinus>
                  <ProblemItemLicencePlateNumber>
                    {problemReport.licencePlateNumber}
                  </ProblemItemLicencePlateNumber>
                  <ProblemItemReportCreationTime key={index}>
                    {moment(problemReport.reportCreationTime).format(
                      'YYYY MM DD '
                    )}
                  </ProblemItemReportCreationTime>
                  <ProblemItemActualStatus>
                    {problemReport.actualStatusName}
                  </ProblemItemActualStatus>
                  <ProblemItemErrorType>
                    {problemReport.errorType}
                  </ProblemItemErrorType>
                  <ProblemItemReporterName>
                    {problemReport.reporterName}
                  </ProblemItemReporterName>
                  <ProblemItemDescription>
                    {problemReport.problemDescription}
                  </ProblemItemDescription>
                </ProblemRow>
              </Hidden.Toggle>
              <Hidden visible={visible}>
                {visible ? (
                  <ProblemReportChange
                    problemReportIdForPRC={problemReport.id}
                  />
                ) : (
                  <div />
                )}
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
          <ProblemItemPlusOrMinus />
          <ProblemItemLicencePlateNumber
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
          </ProblemItemLicencePlateNumber>
          <ProblemItemReportCreationTime
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
          </ProblemItemReportCreationTime>
          <ProblemItemActualStatus>Aktuális státusz</ProblemItemActualStatus>
          <ProblemItemErrorType>Hiba típusa</ProblemItemErrorType>
          <ProblemItemReporterName>Bejelentő</ProblemItemReporterName>
          <ProblemItemDescription font-weight="normal">
            Leírás
          </ProblemItemDescription>
        </FlexHeader>
        <ProblemContainer>{rows}</ProblemContainer>
      </React.Fragment>
    </ProblemReportBlock>
  );
};

export default ProblemReport;
