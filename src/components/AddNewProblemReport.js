import React, { useState } from 'react';
import { Block, Group, Button, Step, Input } from 'reakit';
import './AddNewProblemReport.css';

const AddNewProblemReport = props => {
  const [newProblemReport, setNewProblemReport] = useState({
    newProblemReport: [
      { id: 0 },
      { licencePlateNumber: '' },
      { reportCreationTime: '' },
      { actualStatus: '' },
      { errorType: '' },
      { reporterName: '' },
      {
        problemReportChangeList: [
          {
            id: 1,
            stateChangeTime: '',
            stateChangeMessage: '',
          },
        ],
      },
    ],
  });
  const { licencePlateList } = props;

  const changeReportFieldValue = (event, fieldName) => {
    setNewProblemReport({
      ...newProblemReport,
      [fieldName]: event.target.value,
    });
    console.log({ newProblemReport });
  };

  return (
    <Step.Container initialState={{ current: 0 }}>
      {step => (
        <Block className="inputBlock">
          <Step step="Step 1" {...step}>
            <h2>Bejelentő adatai</h2>
            <div>
              Név:{' '}
              <Input
                use="textarea"
                className="textInput"
                onchange={event =>
                  changeReportFieldValue(event, 'reporterName')
                }
              />
            </div>
            <div>
              E-mail cím:{' '}
              <Input
                use="textarea"
                className="textInput"
                onchange={event =>
                  changeReportFieldValue(event, 'reporterEmail')
                }
              />
            </div>
            <div>
              Telefonszám:{' '}
              <Input
                use="textarea"
                className="textInput"
                onchange={event =>
                  changeReportFieldValue(event, 'reporterPhone')
                }
              />
            </div>
            <div />
            <Group>
              <Button use={Step.Previous} {...step}>
                Előző
              </Button>
              <Button use={Step.Next} {...step}>
                Következő
              </Button>
            </Group>
          </Step>
          <Step step="Step 2" {...step}>
            <h2>Hiba típusa - leírása</h2>
            <div>
              Típusa:
              <Input
                use="select"
                onchange={event => changeReportFieldValue(event, 'errorType')}
              >
                <option>Egyik sem</option>
                <option>Diszpécserközpont</option>
                <option>Járműegység</option>
                <option>Egyéb</option>
              </Input>
            </div>
            <div>
              Gépjármű:
              <Input
                use="select"
                onchange={event =>
                  changeReportFieldValue(event, 'licencePlateNumber')
                }
              >
                {licencePlateList.map(licencePlate => (
                  <option>{licencePlate}</option>
                ))}
              </Input>
            </div>
            <div>
              Leírás:
              <Input
                use="textarea"
                onchange={event =>
                  changeReportFieldValue(
                    event,
                    'problemReportChangeList[0].stateChangeMessage'
                  )
                }
              />
            </div>
            <div>
              <br />
            </div>
            <Group>
              <Button use={Step.Previous} {...step}>
                Előző
              </Button>
              <Button use={Step.Previous} {...step}>
                Mégsem
              </Button>
              <Button use={Step.Next} {...step}>
                Mentés
              </Button>
            </Group>
          </Step>
        </Block>
      )}
    </Step.Container>
  );
};

export default AddNewProblemReport;
