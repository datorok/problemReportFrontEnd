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
  console.log({ licencePlateList });
  return (
    <Step.Container initialState={{ current: 0 }}>
      {step => (
        <Block className="inputBlock">
          <Step step="Step 1" {...step}>
            <h2>Bejelentő adatai</h2>
            <div>
              Név: <Input use="textarea" className="textInput" />
            </div>
            <div>
              E-mail cím: <Input use="textarea" className="textInput" />
            </div>
            <div>
              Telefonszám: <Input use="textarea" className="textInput" />
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
              <Input use="select">
                <option>Egyik sem</option>
                <option>Diszpécserközpont</option>
                <option>Járműegység</option>
                <option>Egyéb</option>
              </Input>
            </div>
            <div>
              Gépjármű:
              <Input use="select">
                {props.licencePlateList.map(licencePlate => (
                  <option>{licencePlate}</option>
                ))}
              </Input>
            </div>
            <div>
              Leírás:
              <Input use="textarea" />
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
