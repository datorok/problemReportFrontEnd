import React from 'react';
import { Input, Block, Button, Backdrop, Portal, Overlay } from 'reakit';
import AddNewProblemReport from './AddNewProblemReport';
import './TypeAndStatus.css';

const TypeAndStatus = props => {
  const {
    errorTypeFilterStatusProp,
    errorFilterStatusProp,
    changeErrorOrStatusType,
    problemReportArr,
  } = props;

  return (
    <div className="typeAndSatusText">
      <div className="blockName">Hiba típusa</div>
      <div>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorTypeFilterStatusProp.dispatCenter.enabled}
          onChange={() => changeErrorOrStatusType('dispatCenter')}
        />{' '}
        Diszpécser központ
      </div>
      <div>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorTypeFilterStatusProp.vehicleUnit.enabled}
          onChange={() => changeErrorOrStatusType('vehicleUnit')}
        />{' '}
        Járműegység
      </div>
      <div>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorTypeFilterStatusProp.other.enabled}
          onChange={() => changeErrorOrStatusType('other')}
        />{' '}
        Egyéb
      </div>
      <div className="blockName">Státusz</div>
      <div>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatusProp.reported.enabled}
          onChange={() => changeErrorOrStatusType('reported')}
        />{' '}
        Hiba bejelentve
      </div>
      <div>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatusProp.reported.enabled}
          onChange={() => changeErrorOrStatusType('reportAppended')}
        />{' '}
        Bejelentés kiegészítve
      </div>
      <div>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatusProp.goingOn.enabled}
          onChange={() => changeErrorOrStatusType('goingOn')}
        />{' '}
        Hibajavítás folyamatban
      </div>
      <div>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatusProp.waitingForInformation.enabled}
          onChange={() => changeErrorOrStatusType('waitingForInformation')}
        />{' '}
        Információra vár
      </div>
      <div>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatusProp.serviceRecommended.enabled}
          onChange={() => changeErrorOrStatusType('serviceRecommended')}
        />{' '}
        Szervizre javasolva
      </div>
      <div>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatusProp.repaired.enabled}
          onChange={() => changeErrorOrStatusType('repaired')}
        />{' '}
        Javítás befejezve
      </div>
      <div>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatusProp.answered.enabled}
          onChange={() => changeErrorOrStatusType('answered')}
        />{' '}
        Megválaszolva
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
                Új hibajegy
              </Button>
              <Backdrop use={[Portal, Overlay.Hide]} {...overlay} />
              <Overlay use={Portal} {...overlay}>
                <AddNewProblemReport
                  overlay={overlay}
                  problemReportArr={problemReportArr}
                />
              </Overlay>
            </Block>
          )}
        </Overlay.Container>
      </div>
    </div>
  );
};
export default TypeAndStatus;
