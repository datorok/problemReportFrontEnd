import React, { useState } from 'react';
import { Block, Group, Button, Step, Input, Overlay } from 'reakit';
import './AddNewProblemReport.css';
import styled from 'styled-components';

const ProblemItemRow = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  display: flex;
  align-items: center;
  width: 500px;
  justify-content: space-around;
  flex-direction: row;
`;
const ProblemItem1 = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  width: 30%;
  min-width: 30%;
  max-width: 30%;
`;
const ProblemItem2 = styled.div`
  overflow: 'scroll';
  align-items: center;
  flex-direction: row;
  width: 70%;
  min-width: 70%;
  max-width: 70%;
`;
const ProblemItem3 = styled.div`
  overflow: 'scroll';
  align-items: center;
  flex-direction: row;
  width: 90%;
  min-width: 90%;
  max-width: 90%;
`;
const AddNewProblemReport = props => {
  const [newProblemReport, setNewProblemReport] = useState({
    id: 0,
    licencePlateNumber: '',
    reportCreationTime: '',
    actualStatus: '',
    errorType: '',
    reporterName: '',
    problemReportChangeList: [
      { id: 1, stateChangeTime: '', stateChangeMessage: '' },
    ],
  });

  const [openTicketIsAvailable, setTicketStatus] = useState(false);

  const [chosenLicenceNumber, setchosenLicenceNumber] = useState('');

  const { licencePlateList, problemReportArr, overlay } = props;

  const getStateChangeMessageArrByLicenceNumber = () => {
    const stateChangeMessageArr = [];

    for (let i = 0; i < problemReportArr.length; i++) {
      if (
        problemReportArr[i].licencePlateNumber ===
        chosenLicenceNumber.chosenLNumber
      ) {
        if (problemReportArr[i].actualStatus !== 'Megválaszolva') {
          if (problemReportArr[i].actualStatus !== 'Javítás befejezve') {
            for (
              let j = 0;
              j < problemReportArr[i].problemReportChangeList.length;
              j++
            ) {
              const temp1 =
                problemReportArr[i].problemReportChangeList[j].stateChangeTime;
              const temp2 =
                problemReportArr[i].problemReportChangeList[j]
                  .stateChangeMessage;
              stateChangeMessageArr.push(`${temp1} ${temp2}`);
            }
            break;
          }
        }
      }
    }
    return stateChangeMessageArr;
  };
  //* *******************************************************

  const changeReportFieldValue = (event, fieldName) => {
    setNewProblemReport({
      ...newProblemReport,
      [fieldName]: event.target.value,
    });
    const lp = event.target.value;
    if (fieldName === 'licencePlateNumber') {
      for (let i = 0; i < problemReportArr.length; i++) {
        if (
          problemReportArr[i].licencePlateNumber === lp &&
          problemReportArr[i].actualStatus !== 'Megválaszolva' &&
          problemReportArr[i].actualStatus !== 'Javítás befejezve'
        ) {
          setTicketStatus({ openTicketAvailable: true });
          setchosenLicenceNumber({ chosenLNumber: lp });
          break;
        } else {
          setTicketStatus({ openTicketAvailable: false });
          setchosenLicenceNumber({ chosenLNumber: '' });
        }
      }
    } else {
      setTicketStatus({ openTicketAvailable: false });
      setchosenLicenceNumber({ chosenLNumber: '' });
    }
  };

  const displayNewReport = () => {
    console.log({ newProblemReport });
  };

  return (
    <Step.Container initialState={{ current: 0 }}>
      {step => (
        <Block className="inputBlock">
          <Step step="Step 1" {...step} className="elementportalModal">
            <h2>Bejelentő adatai</h2>
            <ProblemItemRow>
              <ProblemItem1>Név: </ProblemItem1>
              <ProblemItem2>
                <input
                  use="textarea"
                  className="textInput"
                  onChange={event =>
                    changeReportFieldValue(event, 'reporterName')
                  }
                />
              </ProblemItem2>
            </ProblemItemRow>
            <ProblemItemRow>
              <ProblemItem1> E-mail cím:</ProblemItem1>
              <ProblemItem2>
                <input
                  use="textarea"
                  className="textInput"
                  onChange={event =>
                    changeReportFieldValue(event, 'reporterEmail')
                  }
                />
              </ProblemItem2>
            </ProblemItemRow>
            <ProblemItemRow>
              <ProblemItem1>Telefonszám:</ProblemItem1>
              <ProblemItem2>
                <input
                  use="textarea"
                  className="textInput"
                  onChange={event =>
                    changeReportFieldValue(event, 'reporterPhone')
                  }
                />
              </ProblemItem2>
            </ProblemItemRow>

            <div className="emptySpace" />
            <div className="elementportalModalButtons">
              <Group>
                <Button use={Step.Previous} {...step}>
                  Előző
                </Button>
                <Button use={Step.Next} {...step}>
                  Következő
                </Button>
              </Group>
            </div>
          </Step>
          <Step step="Step 2" {...step} className="elementportalModal">
            <h2>Hiba típusa - leírása</h2>
            <div>
              <ProblemItemRow>
                <ProblemItem1>Típusa: </ProblemItem1>
                <ProblemItem2>
                  <Input
                    className="dropDownList"
                    use="select"
                    onChange={event =>
                      changeReportFieldValue(event, 'errorType')
                    }
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
                    onChange={event =>
                      changeReportFieldValue(event, 'licencePlateNumber')
                    }
                  >
                    {licencePlateList.map(licencePlate => (
                      <option key={licencePlate}>{licencePlate}</option>
                    ))}
                  </Input>
                </ProblemItem2>
              </ProblemItemRow>
              {openTicketIsAvailable
                ? getStateChangeMessageArrByLicenceNumber().map(change => (
                    <ProblemItem3>{change}</ProblemItem3>
                  ))
                : null}
              <div>Leírás: </div>
              <Input
                className="longtextarea"
                use="textarea"
                multiline="true"
                onChange={event =>
                  changeReportFieldValue(
                    event,
                    'problemReportChangeList[0].stateChangeMessage'
                  )
                }
              />
              <div className="elementportalModalButtons">
                <Group>
                  <Button use={Step.Previous} {...step}>
                    Előző
                  </Button>
                  <Button use={Overlay.Toggle} {...overlay}>
                    Mégsem
                  </Button>
                  <Button
                    use={Overlay.Toggle}
                    {...overlay}
                    onClick={event => displayNewReport(event)}
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
