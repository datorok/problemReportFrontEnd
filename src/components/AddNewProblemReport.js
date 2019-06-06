import React, { useState, useEffect } from 'react';
import { Block, Group, Step, Button, Overlay } from 'reakit';
import moment from 'moment';
import { ClimbingBoxLoader } from 'react-spinners';
import { ProblemContainerObject } from '../containers/ProblemContainer';
import {
  AnimationLoader,
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

const AddNewProblemReport = props => {
  const { ProblemReportArr } = ProblemContainerObject.state;
  const { overlay } = props;

  if (ProblemReportArr.length <= 0) {
    return;
  }
  const [licencePlateNumberArr, setLicencePlateNumberArr] = useState(undefined);
  const [
    changeListOfTheChosenProblemReportObject,
    setChangeListOfTheChosenProblemReportObject,
  ] = useState(undefined);

  useEffect(() => {
    ProblemContainerObject.fetchVehicleList().then(dataFromDb =>
      setLicencePlateNumberArr(dataFromDb)
    );
  }, []);

  const [chosenVehicleObject, setChosenVehicleObject] = useState(undefined);
  if (chosenVehicleObject) {
    useEffect(() => {
      ProblemContainerObject.fetchChangeList(chosenVehicleObject.id).then(
        dataFromDb => setChangeListOfTheChosenProblemReportObject(dataFromDb)
      );
    }, [chosenVehicleObject.id]);
  }
  const [reportId, setReportId] = useState(ProblemReportArr[0].id);
  const [reporterName, setReporterName] = useState(emptyString);
  const [reporterEmail, setReporterEmail] = useState(emptyString);
  const [reporterPhone, setReporterPhone] = useState(emptyString);
  const [errorType, setErrorType] = useState(defaultErrorType);
  const [chosenVehicleId, setChosenVehicleId] = useState(
    ProblemReportArr[0].id
  );
  const [vehicleLicencePlateNumber, setVehicleLicencePlateNumber] = useState(
    ProblemReportArr[0].licencePlateNumber
  );
  const [problemDesc, setProblemDesc] = useState(emptyString);
  const [openTicketIsAvailable, setTicketStatus] = useState(false);
  const [actualStatusName, setActualStatusName] = useState(
    ProblemReportArr[0].actualStatusName
  );
  const [statusColor, setStatusColor] = useState(
    ProblemReportArr[0].actualStatusColor
  );

  const checkActualStatusOfTheChosenVehicle = event => {
    const actChosenVehicleId = event.target.value;
    let shouldChange = false;
    for (let i = 0; i < ProblemReportArr.length; i++) {
      if (ProblemReportArr[i].id === parseInt(actChosenVehicleId)) {
        setVehicleLicencePlateNumber(ProblemReportArr[i].licencePlateNumber);
        if (
          ProblemReportArr[i].actualStatus !== '5' &&
          ProblemReportArr[i].actualStatus !== '4'
        ) {
          shouldChange = true;
          if (ProblemReportArr[i].actualStatus === '0') {
            setActualStatusName(ProblemReportArr[i].actualStatusName);
            setStatusColor(ProblemReportArr[i].statusColor);
            setReportId(ProblemReportArr[i].id);
          } else if (ProblemReportArr[i].actualStatus === '6') {
            setActualStatusName(ProblemReportArr[i].actualStatusName);
            setStatusColor(ProblemReportArr[i].statusColor);
            setReportId(ProblemReportArr[i].id);
          } else if (ProblemReportArr[i].actualStatus === '1') {
            setActualStatusName(ProblemReportArr[i].actualStatusName);
            setStatusColor(ProblemReportArr[i].statusColor);
            setReportId(ProblemReportArr[i].id);
          } else if (ProblemReportArr[i].actualStatus === '2') {
            setActualStatusName(ProblemReportArr[i].actualStatusName);
            setStatusColor(ProblemReportArr[i].statusColor);
            setReportId(ProblemReportArr[i].id);
          } else if (ProblemReportArr[i].actualStatus === '3') {
            setActualStatusName(ProblemReportArr[i].actualStatusName);
            setStatusColor(ProblemReportArr[i].statusColor);
            setReportId(ProblemReportArr[i].id);
          } else if (ProblemReportArr[i].actualStatus === '7') {
            setActualStatusName(ProblemReportArr[i].actualStatusName);
            setStatusColor(ProblemReportArr[i].statusColor);
            setReportId(ProblemReportArr[i].id);
          }
        } else if (
          ProblemReportArr[i].actualStatus === '5' ||
          ProblemReportArr[i].actualStatus === '4'
        ) {
          setActualStatusName(ProblemReportArr[i].actualStatusName);
          setStatusColor(ProblemReportArr[i].statusColor);
          setReportId(0);
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
    ProblemContainerObject.persistNewProblem(
      reportId,
      reporterName,
      reporterEmail,
      reporterPhone,
      errorType,
      chosenVehicleId,
      vehicleLicencePlateNumber,
      problemDesc
    );
  };

  const afterCancel = () => {
    setReporterName(emptyString);
    setReporterEmail(emptyString);
    setReporterPhone(emptyString);
    setErrorType(defaultErrorType);
    setChosenVehicleId(ProblemReportArr[0].id);
    setProblemDesc(emptyString);
  };

  const setTheStatusOfTheInitialProblemreport = () => {
    setTicketStatus(
      ProblemReportArr[0].actualStatus !== '5' &&
        ProblemReportArr[0].actualStatus !== '4'
    );
  };
  if (!Array.isArray(licencePlateNumberArr)) {
    console.log('licencePlateNumberArr in AddNewProblemReport: ');
    console.log(licencePlateNumberArr);
    return (
      <AnimationLoader>
        <ClimbingBoxLoader sizeUnit="px" size={30} color="#ffa500" />
      </AnimationLoader>
    );
  }

  console.log({ chosenVehicleObject });
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
                    onChange={event => {
                      setReporterName(event.target.value);
                    }}
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
                    onChange={event => {
                      setReporterEmail(event.target.value);
                    }}
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
                    onChange={event => {
                      setReporterPhone(event.target.value);
                    }}
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
                    onClick={event => {
                      setTheStatusOfTheInitialProblemreport();
                    }}
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
                      onChange={event => {
                        setErrorType(event.target.value);
                      }}
                    >
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
                        setChosenVehicleObject(
                          ProblemReportArr.find(
                            obj =>
                              obj.licencePlateNumber.toUpperCase() ===
                                event.target.value.toUpperCase() &&
                              obj.actualStatusId !== 4 &&
                              obj.actualStatusId !== 5
                          )
                        );
                      }}
                    >
                      {licencePlateNumberArr.map(value => (
                        <option
                          value={value.vehicleId}
                          key={value.vehicleLicencePlate}
                        >
                          {value.vehicleLicencePlate}
                        </option>
                      ))}
                    </Input>
                  </ProblemItem2>
                </ProblemItemRow>
                {chosenVehicleObject &&
                  changeListOfTheChosenProblemReportObject.map(report => (
                    <OpenTicketBasicData>
                      <ProblemItem5>{report.reporterName}</ProblemItem5>
                      <ProblemItem6 color={statusColor}>
                        {actualStatusName}
                      </ProblemItem6>
                    </OpenTicketBasicData>
                  ))}
                {chosenVehicleObject &&
                  changeListOfTheChosenProblemReportObject.map(report => {
                    const changeFirst = report[0];
                    const changeLast =
                      report.length > 1
                        ? report[report.problemReportChangeList.length - 1]
                        : undefined;
                    return (
                      <div>
                        <OpenTicketProblemItemRow>
                          <ProblemItem3>
                            {moment(changeFirst.stateChangeTime).format(
                              'YYYY MM DD'
                            )}
                          </ProblemItem3>
                          <ProblemItem4>
                            {changeFirst.stateChangeMessage}
                          </ProblemItem4>
                        </OpenTicketProblemItemRow>
                        {changeLast && (
                          <OpenTicketProblemItemRow>
                            <ProblemItem3>
                              {moment(changeFirst.stateChangeTime).format(
                                'YYYY MM DD'
                              )}
                            </ProblemItem3>
                            <ProblemItem4>
                              {changeLast.stateChangeMessage}
                            </ProblemItem4>
                          </OpenTicketProblemItemRow>
                        )}
                      </div>
                    );
                  })}
                <OpenTicketDescription>
                  {openTicketIsAvailable
                    ? 'Megjegyzés hozzáfűzése a nyitott jegyhez :'
                    : 'Leírás:'}
                </OpenTicketDescription>
                <Longtextarea
                  use="text"
                  value={problemDesc}
                  onChange={event => {
                    setProblemDesc(event.target.value);
                    console.log(
                      `problemDesc in AddNewProblemReport :${problemDesc}`
                    );
                  }}
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
