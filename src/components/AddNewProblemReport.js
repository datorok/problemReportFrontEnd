import React, { useState } from 'react';
import { Block, Group, Step, Button, Overlay } from 'reakit';

import {
  Input,
  OpenTicketProblemItemRow,
  OpenTicketBasicData,
  ProblemItemRow,
  ProblemItem1,
  ProblemItem2,
  ProblemItem3,
  ProblemItem4,
  ProblemItem5,
  ProblemItem6,
  NewTicketHead,
  OpenTicketDescription,
  ElementportalModalButtons,
  ElementPortalModal,
  Longtextarea,
} from './AddNewProblemReport.style';

const emptyString = '';
const defaultErrorType = 'Egyik sem';
const ticketIsOpen = actualStatus =>
  actualStatus !== 'Megválaszolva' && actualStatus !== 'Javítás befejezve';

const AddNewProblemReport = props => {
  const { problemReportArr, overlay } = props;

  const [reporterName, setReporterName] = useState(emptyString);
  const [reporterEmail, setReporterEmail] = useState(emptyString);
  const [reporterPhone, setReporterPhone] = useState(emptyString);
  const [errorType, setErrorType] = useState(defaultErrorType);
  const [chosenVehicleId, setChosenVehicleId] = useState(
    problemReportArr[0].id
  );
  const [problemDescription, setProblemDescription] = useState(emptyString);
  const [openTicketIsAvailable, setTicketStatus] = useState(
    ticketIsOpen(problemReportArr[0].actualStatus)
  );

  const red = {
    backgroundColor: 'OrangeRed',
    textAlign: 'center',
    font: 'inherit',
    border: '1px solid black',
    padding: '10px',
  };
  const green = {
    backgroundColor: 'SpringGreen',
    textAlign: 'center',
    font: 'inherit',
    border: '1px solid black',
    padding: '5px',
  };
  const blue = {
    backgroundColor: 'SkyBlue',
    textAlign: 'center',
    font: 'inherit',
    border: '1px solid black',
    padding: '5px',
  };
  const yellow = {
    backgroundColor: 'Yellow',
    textAlign: 'center',
    font: 'inherit',
    border: '1px solid black',
    padding: '5px',
  };
  const magenta = {
    backgroundColor: 'Magenta',
    textAlign: 'center',
    font: 'inherit',
    border: '1px solid black',
    padding: '5px',
  };
  const colorless = {
    backgroundColor: 'white',
    textAlign: 'center',
    font: 'inherit',
    padding: '5px',
  };
  const colorChoser = () => {
    if (
      problemReportArr[0].actualStatus === 'Megválaszolva' ||
      problemReportArr[0].actualStatus === 'Javítás befejezve'
    ) {
      return colorless;
    }
    if (problemReportArr[0].actualStatus === 'Hiba bejelentve') {
      return red;
    }
    if (problemReportArr[0].actualStatus === 'Bejelentés kiegészítve') {
      return green;
    }
    if (problemReportArr[0].actualStatus === 'Hibajavítás folyamatban') {
      return blue;
    }
    if (problemReportArr[0].actualStatus === 'Információra vár') {
      return yellow;
    }
    if (problemReportArr[0].actualStatus === 'Szervizre javasolva') {
      return magenta;
    }
  };

  const [actualStatusStyling, setActualStatusStyling] = useState(colorChoser);

  const checkActualStatusOfTheChosenVehicle = event => {
    const actChosenVehicleId = event.target.value;
    let shouldChange = false;
    for (let i = 0; i < problemReportArr.length; i++) {
      if (problemReportArr[i].id === parseInt(actChosenVehicleId)) {
        if (
          problemReportArr[i].actualStatus !== 'Megválaszolva' &&
          problemReportArr[i].actualStatus !== 'Javítás befejezve'
        ) {
          shouldChange = true;
          if (problemReportArr[i].actualStatus === 'Hiba bejelentve') {
            setActualStatusStyling(red);
          } else if (
            problemReportArr[i].actualStatus === 'Bejelentés kiegészítve'
          ) {
            setActualStatusStyling(green);
          } else if (
            problemReportArr[i].actualStatus === 'Hibajavítás folyamatban'
          ) {
            setActualStatusStyling(blue);
          } else if (problemReportArr[i].actualStatus === 'Információra vár') {
            setActualStatusStyling(yellow);
          } else if (
            problemReportArr[i].actualStatus === 'Szervizre javasolva'
          ) {
            setActualStatusStyling(magenta);
          }
        } else if (
          problemReportArr[i].actualStatus === 'Megválaszolva' &&
          problemReportArr[i].actualStatus === 'Javítás befejezve'
        ) {
          setActualStatusStyling(colorless);
          break;
        }
      }
    }
    if (shouldChange === true) {
      setTicketStatus(true);
    } else {
      setTicketStatus(false);
    }
  };

  const displayNewReport = () => {
    console.log({ reporterName });
    console.log({ reporterEmail });
    console.log({ reporterPhone });
    console.log({ errorType });
    console.log({ chosenVehicleId });
    console.log({ problemDescription });
  };

  const afterCancel = () => {
    setReporterName(emptyString);
    setReporterEmail(emptyString);
    setReporterPhone(emptyString);
    setErrorType(defaultErrorType);
    setChosenVehicleId(problemReportArr[0].id);
    setProblemDescription(emptyString);
  };

  return (
    <Step.Container initialState={{ current: 0 }}>
      {({
        previous,
        hasPrevious,
        next,
        hasNext,
        register,
        unregister,
        isCurrent,
      }) => (
        <Block className="inputBlock">
          <Step
            step="Step 1"
            register={register}
            unregister={unregister}
            isCurrent={isCurrent}
          >
            <ElementPortalModal>
              <NewTicketHead>Bejelentő adatai</NewTicketHead>
              <ProblemItemRow>
                <ProblemItem1>Név: </ProblemItem1>
                <ProblemItem2>
                  <textarea
                    use="text"
                    rows={1}
                    cols={40}
                    value={reporterName}
                    onChange={event => setReporterName(event.target.value)}
                  />
                </ProblemItem2>
              </ProblemItemRow>
              <ProblemItemRow>
                <ProblemItem1> E-mail cím:</ProblemItem1>
                <ProblemItem2>
                  <textarea
                    use="text"
                    rows={1}
                    cols={40}
                    value={reporterEmail}
                    onChange={event => setReporterEmail(event.target.value)}
                  />
                </ProblemItem2>
              </ProblemItemRow>
              <ProblemItemRow>
                <ProblemItem1>Telefonszám:</ProblemItem1>
                <ProblemItem2>
                  <textarea
                    use="text"
                    rows={1}
                    cols={40}
                    value={reporterPhone}
                    onChange={event => setReporterPhone(event.target.value)}
                  />
                </ProblemItem2>
              </ProblemItemRow>

              <ElementportalModalButtons>
                <Group>
                  <Button
                    use={Overlay.Toggle}
                    {...overlay}
                    onClick={event => {
                      afterCancel();
                    }}
                    width={90}
                  >
                    Mégse
                  </Button>
                  <Button
                    use={Step.Next}
                    next={next}
                    hasNext={hasNext}
                    width={90}
                  >
                    Következő
                  </Button>
                </Group>
              </ElementportalModalButtons>
            </ElementPortalModal>
          </Step>
          <Step
            step="Step 2"
            register={register}
            unregister={unregister}
            isCurrent={isCurrent}
            className="elementportalModal"
          >
            <ElementPortalModal>
              <NewTicketHead>Hiba típusa - leírása</NewTicketHead>
              <div>
                <ProblemItemRow>
                  <ProblemItem1>Típusa: </ProblemItem1>
                  <ProblemItem2>
                    <Input
                      value={errorType}
                      use="select"
                      onChange={event => setErrorType(event.target.value)}
                    >
                      <option>Egyik sem</option>
                      <option>Diszpécserközpont</option>
                      <option>Járműegység</option>
                      <option>Egyéb</option>
                    </Input>
                  </ProblemItem2>
                </ProblemItemRow>
                <ProblemItemRow>
                  <ProblemItem1>Gépjármű: </ProblemItem1>
                  <ProblemItem2>
                    <Input
                      use="select"
                      value={chosenVehicleId}
                      onChange={event => {
                        setChosenVehicleId(event.target.value);
                        checkActualStatusOfTheChosenVehicle(event);
                      }}
                    >
                      {problemReportArr.map(value => (
                        <option value={value.id} key={value.licencePlateNumber}>
                          {value.licencePlateNumber}
                        </option>
                      ))}
                    </Input>
                  </ProblemItem2>
                </ProblemItemRow>
                {openTicketIsAvailable
                  ? problemReportArr
                      .filter(report => report.id === parseInt(chosenVehicleId))
                      .map(report => (
                        <OpenTicketBasicData>
                          <ProblemItem5>{report.reporterName}</ProblemItem5>
                          <ProblemItem6 style={actualStatusStyling}>
                            {report.actualStatus}
                          </ProblemItem6>
                        </OpenTicketBasicData>
                      ))
                  : null}
                {console.log(
                  `actualStatusStyling: ${actualStatusStyling.backgroundColor}`
                )}
                {openTicketIsAvailable
                  ? problemReportArr
                      .filter(report => report.id === parseInt(chosenVehicleId))
                      .map(report => {
                        const changeFirst = report.problemReportChangeList[0];
                        const changeLast =
                          report.problemReportChangeList.length > 1
                            ? report.problemReportChangeList[
                                report.problemReportChangeList.length - 1
                              ]
                            : undefined;
                        return (
                          <div>
                            <OpenTicketProblemItemRow>
                              <ProblemItem3>
                                {changeFirst.stateChangeTime}
                              </ProblemItem3>
                              <ProblemItem4>
                                {changeFirst.stateChangeMessage}
                              </ProblemItem4>
                            </OpenTicketProblemItemRow>
                            {changeLast && (
                              <OpenTicketProblemItemRow>
                                <ProblemItem3>
                                  {changeLast.stateChangeTime}
                                </ProblemItem3>
                                <ProblemItem4>
                                  {changeLast.stateChangeMessage}
                                </ProblemItem4>
                              </OpenTicketProblemItemRow>
                            )}
                          </div>
                        );
                      })
                  : null}
                <OpenTicketDescription>
                  {openTicketIsAvailable
                    ? 'Megjegyzés hozzáfűzése a nyitott jegyhez :'
                    : 'Leírás:'}
                </OpenTicketDescription>
                <Longtextarea
                  use="text"
                  value={problemDescription}
                  onChange={event => setProblemDescription(event.target.value)}
                />
                <ElementportalModalButtons>
                  <Group>
                    <Button
                      use={Step.Previous}
                      previous={previous}
                      hasPrevious={hasPrevious}
                      width={90}
                    >
                      Előző
                    </Button>
                    <Button
                      use={Overlay.Toggle}
                      {...overlay}
                      onClick={event => {
                        afterCancel();
                        previous();
                      }}
                      width={90}
                    >
                      Mégse
                    </Button>
                    <Button
                      use={Overlay.Toggle}
                      {...overlay}
                      onClick={event => {
                        displayNewReport();
                        afterCancel();
                      }}
                      width={90}
                    >
                      Mentés
                    </Button>
                  </Group>
                </ElementportalModalButtons>
              </div>
            </ElementPortalModal>
          </Step>
        </Block>
      )}
    </Step.Container>
  );
};

export default AddNewProblemReport;
