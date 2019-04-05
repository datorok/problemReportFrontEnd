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

  return (
    <Step.Container initialState={{ current: 0 }}>
      {step => (
        <Block className="inputBlock">
          <Step step="Step 1" {...step}>
            <h2>Bejelentő adatai</h2>
            <div>
              <Input use="textarea" className="textInput" />
              Név:{' '}
            </div>
            <div>
              <Input use="textarea" className="textInput" />
              E-mail cím:{' '}
            </div>
            <div>
              <Input use="textarea" className="textInput" />
              Telefonszám:{' '}
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
                <option>ABC-123</option>
                <option>ABC-124</option>
                <option>ABC-125</option>
                <option>ABC-126</option>
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
