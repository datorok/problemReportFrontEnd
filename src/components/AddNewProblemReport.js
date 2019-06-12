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
  const { ProblemReportArr, MixedArr } = ProblemContainerObject.state;
  const { overlay } = props;

  const [reporterName, setReporterName] = useState(emptyString);
  const [reporterEmail, setReporterEmail] = useState(emptyString);
  const [reporterPhone, setReporterPhone] = useState(emptyString);
  const [problemDesc, setProblemDesc] = useState(emptyString);
  const [errorType, setErrorType] = useState(defaultErrorType);
  const [chosenVehicleObject, setChosenVehicleObject] = useState(undefined);

  const [
    changeListOfTheChosenVehicleObject,
    setChangeListOfTheChosenVehicleObject,
  ] = useState(undefined);

  const [reportId, setReportId] = useState(undefined);
  const [chosenVehicleId, setChosenVehicleId] = useState(undefined);
  const [vehicleLicencePlateNumber, setVehicleLicencePlateNumber] = useState(
    undefined
  );
  const [actualStatusName, setActualStatusName] = useState(undefined);
  const [statusColor, setStatusColor] = useState(undefined);

  const getChanges = async id => {
    ProblemContainerObject.fetchChangeList(id).then(dataFromDb =>
      setChangeListOfTheChosenVehicleObject(dataFromDb)
    );
  };

  const checkActualStatusOfTheChosenVehicle = event => {
    const actChosenVehicleId = event.target.value;
    for (let i = 0; i < MixedArr.length; i++) {
      if (MixedArr[i].vehicleId === parseInt(actChosenVehicleId)) {
        setVehicleLicencePlateNumber(MixedArr[i].vehicleLicencePlate);
        if (
          MixedArr[i].actualStatusId &&
          MixedArr[i].actualStatusId !== 5 &&
          MixedArr[i].actualStatusId !== 4
        ) {
          if (ProblemReportArr[i].actualStatus === '0') {
            setActualStatusName(MixedArr[i].actualStatusName);
            setStatusColor(MixedArr[i].actualStatusColor);
            setReportId(MixedArr[i].id);
          } else if (MixedArr[i].actualStatus === '6') {
            setActualStatusName(MixedArr[i].actualStatusName);
            setStatusColor(MixedArr[i].actualStatusColor);
            setReportId(MixedArr[i].id);
          } else if (MixedArr[i].actualStatus === '1') {
            setActualStatusName(MixedArr[i].actualStatusName);
            setStatusColor(MixedArr[i].actualStatusColor);
            setReportId(MixedArr[i].id);
          } else if (MixedArr[i].actualStatus === '2') {
            setActualStatusName(MixedArr[i].actualStatusName);
            setStatusColor(MixedArr[i].actualStatusColor);
            setReportId(MixedArr[i].id);
          } else if (MixedArr[i].actualStatus === '3') {
            setActualStatusName(MixedArr[i].actualStatusName);
            setStatusColor(MixedArr[i].actualStatusColor);
            setReportId(MixedArr[i].id);
          } else if (MixedArr[i].actualStatus === '7') {
            setActualStatusName(MixedArr[i].actualStatusName);
            setStatusColor(MixedArr[i].actualStatusColor);
            setReportId(MixedArr[i].id);
          }
        } else {
          setActualStatusName(MixedArr[i].actualStatusName);
          setStatusColor(MixedArr[i].actualStatusColor);
          setReportId(0);
          break;
        }
      }
    }
  };

  const displayNewReport = () => {
    console.log(`reportId: ${chosenVehicleId}`);
    console.log(`reportName: ${reporterName}`);
    console.log(`reportEmail: ${reporterEmail}`);
    console.log(`reportreporterPhone: ${reporterPhone}`);
    console.log(`errorType: ${errorType}`);
    console.log(`chosenVehicleId: ${chosenVehicleId}`);
    console.log(`vehicleLicencePlateNumber: ${vehicleLicencePlateNumber}`);
    console.log(`problemDesc: ${problemDesc}`);

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
    setChosenVehicleId(MixedArr[0].id);
    setProblemDesc(emptyString);
  };
  let changeFirst;
  let changeLast;

  if (!Array.isArray(MixedArr)) {
    return (
      <AnimationLoader>
        <ClimbingBoxLoader sizeUnit="px" size={30} color="#ffa500" />
      </AnimationLoader>
    );
  }
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
                        if (event.target.value === '-1') {
                          setChosenVehicleId(undefined);
                          return;
                        }
                        const temp = MixedArr.find(
                          obj => obj.vehicleId.toString() === event.target.value
                        );
                        console.log('temp.id');
                        console.log(temp.id);
                        if (temp.id) {
                          getChanges(temp.id);
                        } else {
                          setChangeListOfTheChosenVehicleObject(undefined);
                        }
                        setChosenVehicleObject(temp);
                        setChosenVehicleId(event.target.value);
                        checkActualStatusOfTheChosenVehicle(event);
                      }}
                    >
                      <option value={-1} disabled={chosenVehicleId}>
                        Válasszon rendszámot!
                      </option>
                      {MixedArr.map(value => (
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
                {console.log('changeListOfTheChosenVehicleObject:')}
                {console.log(Array.isArray(changeListOfTheChosenVehicleObject))}
                {console.log(changeListOfTheChosenVehicleObject)}
                {changeListOfTheChosenVehicleObject && (
                  <div>
                    <OpenTicketBasicData>
                      <ProblemItem5>
                        {
                          ProblemReportArr.find(
                            element =>
                              element.id ===
                              changeListOfTheChosenVehicleObject[0]
                                .problemReportId
                          ).reporterName
                        }
                      </ProblemItem5>
                      <ProblemItem6 style={{ color: statusColor }}>
                        {
                          ProblemReportArr.find(
                            element =>
                              element.id ===
                              changeListOfTheChosenVehicleObject[0]
                                .problemReportId
                          ).actualStatusName
                        }
                      </ProblemItem6>
                    </OpenTicketBasicData>
                    <OpenTicketProblemItemRow>
                      <ProblemItem3>
                        {moment(
                          changeListOfTheChosenVehicleObject[0].stateChangeTime
                        ).format('YYYY MM DD')}
                      </ProblemItem3>
                      <ProblemItem4>
                        {
                          changeListOfTheChosenVehicleObject[0]
                            .stateChangeMessage
                        }
                      </ProblemItem4>
                    </OpenTicketProblemItemRow>
                    {changeListOfTheChosenVehicleObject.length > 1 && (
                      <OpenTicketProblemItemRow>
                        <ProblemItem3>
                          {moment(
                            changeListOfTheChosenVehicleObject[
                              changeListOfTheChosenVehicleObject.length - 1
                            ].stateChangeTime
                          ).format('YYYY MM DD')}
                        </ProblemItem3>
                        <ProblemItem4>
                          {
                            changeListOfTheChosenVehicleObject[
                              changeListOfTheChosenVehicleObject.length - 1
                            ].stateChangeMessage
                          }
                        </ProblemItem4>
                      </OpenTicketProblemItemRow>
                    )}
                  </div>
                )}
                <OpenTicketDescription>
                  {changeListOfTheChosenVehicleObject
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
                      disabled={!chosenVehicleId}
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
