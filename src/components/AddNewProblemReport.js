import React, { useState } from 'react';
import { Block, Group, Button, Step, Input, Overlay } from 'reakit';
import './AddNewProblemReport.css';
import {
  OpenTicketProblemItemRow,
  OpenTicketBasicData,
  ProblemItemRow,
  ProblemItem1,
  ProblemItem2,
  ProblemItem3,
  ProblemItem4,
  ProblemItem5,
  ProblemItem6,
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

  const checkActualStatusOfTheChosenVehicle = event => {
    const actChosenVehicleId = event.target.value;
    let shouldChange = false;
    for (let i = 0; i < problemReportArr.length; i++) {
      if (problemReportArr[i].id === parseInt(actChosenVehicleId)) {
        if (ticketIsOpen(problemReportArr[i].actualStatus === true)) {
          shouldChange = true;
        }
        break;
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
            className="elementportalModal"
          >
            <h2>Bejelentő adatai</h2>
            <ProblemItemRow>
              <ProblemItem1>Név: </ProblemItem1>
              <ProblemItem2>
                <input
                  use="textarea"
                  className="textInput"
                  value={reporterName}
                  onChange={event => setReporterName(event.target.value)}
                />
              </ProblemItem2>
            </ProblemItemRow>
            <ProblemItemRow>
              <ProblemItem1> E-mail cím:</ProblemItem1>
              <ProblemItem2>
                <input
                  use="textarea"
                  className="textInput"
                  value={reporterEmail}
                  onChange={event => setReporterEmail(event.target.value)}
                />
              </ProblemItem2>
            </ProblemItemRow>
            <ProblemItemRow>
              <ProblemItem1>Telefonszám:</ProblemItem1>
              <ProblemItem2>
                <input
                  use="textarea"
                  className="textInput"
                  value={reporterPhone}
                  onChange={event => setReporterPhone(event.target.value)}
                />
              </ProblemItem2>
            </ProblemItemRow>

            <div className="emptySpace" />
            <div className="elementportalModalButtons">
              <Group>
                <Button
                  use={Overlay.Toggle}
                  {...overlay}
                  onClick={event => {
                    afterCancel();
                  }}
                >
                  Mégse
                </Button>
                <Button use={Step.Next} next={next} hasNext={hasNext}>
                  Következő
                </Button>
              </Group>
            </div>
          </Step>
          <Step
            step="Step 2"
            register={register}
            unregister={unregister}
            isCurrent={isCurrent}
            className="elementportalModal"
          >
            <h2>Hiba típusa - leírása</h2>
            <div>
              <ProblemItemRow>
                <ProblemItem1>Típusa: </ProblemItem1>
                <ProblemItem2>
                  <Input
                    className="dropDownList"
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
                    className="dropDownList"
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
                        <ProblemItem6>{report.actualStatus}</ProblemItem6>
                      </OpenTicketBasicData>
                    ))
                : null}

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
                          <div className="emptySpace2" />
                          <OpenTicketProblemItemRow>
                            <ProblemItem3>
                              {changeFirst.stateChangeTime}
                            </ProblemItem3>
                            <ProblemItem4>
                              {changeFirst.stateChangeMessage}
                            </ProblemItem4>
                          </OpenTicketProblemItemRow>
                          <div className="emptySpace2" />
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
              <div id="openTicketDescription">
                {openTicketIsAvailable
                  ? 'Megjegyzés hozzáfűzése a nyitott jegyhez :'
                  : 'Leírás:'}
              </div>
              <div className="emptySpace2" />
              <Input
                className="longtextarea"
                use="textarea"
                multiline="true"
                value={problemDescription}
                id="problemDescriptionField"
                onChange={event => setProblemDescription(event.target.value)}
              />
              <div className="elementportalModalButtons">
                <Group>
                  <Button
                    use={Step.Previous}
                    previous={previous}
                    hasPrevious={hasPrevious}
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
                  >
                    Mentés
                  </Button>
                </Group>
              </div>
            </div>
          </Step>
        </Block>
      )}
    </Step.Container>
  );
};

export default AddNewProblemReport;
