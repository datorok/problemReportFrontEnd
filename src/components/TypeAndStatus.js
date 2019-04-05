import React from 'react';
import { Input, Block, Button, Backdrop, Portal, Overlay } from 'reakit';
import AddNewProblemReport from './AddNewProblemReport';
import './TypeAndStatus.css';

const TypeAndStatus = props => {
  const addNewProblemReportDiv = <AddNewProblemReport />;
  const {
    errorTypeFilterStatusProp,
    errorFilterStatusProp,
    changeErrorType,
    changeStatusType,
  } = props;

  return (
    <div>
      <h3>Hiba típusa</h3>
      <div>
        <Input
          type="checkbox"
          defaultChecked={errorTypeFilterStatusProp.dispatCenter.enabled}
          onChange={() => changeErrorType('dispatCenter')}
        />{' '}
        Diszpécser központ
      </div>
      <div>
        <Input
          type="checkbox"
          defaultChecked={errorTypeFilterStatusProp.vehicleUnit.enabled}
          onChange={() => changeErrorType('vehicleUnit')}
        />{' '}
        Járműegység
      </div>
      <div>
        <Input
          type="checkbox"
          defaultChecked={errorTypeFilterStatusProp.other.enabled}
          onChange={() => changeErrorType('other')}
        />{' '}
        Egyéb
      </div>
      <h3>Státusz</h3>
      <div>
        <Input
          type="checkbox"
          defaultChecked={errorFilterStatusProp.reported.enabled}
          onChange={() => changeStatusType('reported')}
        />{' '}
        Hiba bejelentve
      </div>
      <div>
        <Input
          type="checkbox"
          defaultChecked={errorFilterStatusProp.goingOn.enabled}
          onChange={() => changeStatusType('goingOn')}
        />{' '}
        Hibajavítás folyamatban
      </div>
      <div>
        <Input
          type="checkbox"
          defaultChecked={errorFilterStatusProp.waitingForInformation.enabled}
          onChange={() => changeStatusType('waitingForInformation')}
        />{' '}
        Információra vár
      </div>
      <div>
        <Input
          type="checkbox"
          defaultChecked={errorFilterStatusProp.serviceRecommended.enabled}
          onChange={() => changeStatusType('serviceRecommended')}
        />{' '}
        Szervizre javasolva
      </div>
      <div>
        <Input
          type="checkbox"
          defaultChecked={errorFilterStatusProp.repaired.enabled}
          onChange={() => changeStatusType('repaired')}
        />{' '}
        Javítás befejezve
      </div>
      <div>
        <Input
          type="checkbox"
          defaultChecked={errorFilterStatusProp.answered.enabled}
          onChange={() => changeStatusType('answered')}
        />{' '}
        Megválaszolva
      </div>
      <div>
        <br />
      </div>
      <div>
        <Overlay.Container>
          {overlay => (
            <Block>
              <Button
                use={Overlay.Show}
                {...overlay}
                className="addNewProblemReportButton"
              >
                {' '}
                Új hibajegy
              </Button>
              <Backdrop use={[Portal, Overlay.Hide]} {...overlay} />
              <Overlay use={Portal} {...overlay}>
                <div>{addNewProblemReportDiv}</div>
              </Overlay>
            </Block>
          )}
        </Overlay.Container>
      </div>
    </div>
  );
};
export default TypeAndStatus;
