import React from 'react';
import { Input, Block, Button, Backdrop, Portal, Overlay } from 'reakit';
import AddNewProblemReport from './AddNewProblemReport';
import { TypeAndSatusText, BlockName, Option } from './TypeAndStatus.style';

const TypeAndStatus = props => {
  const {
    errorTypeFilterStatusProp,
    errorFilterStatusProp,
    changeErrorOrStatusType,
    problemReportArr,
  } = props;

  return (
    <TypeAndSatusText>
      <BlockName>Hiba típusa</BlockName>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorTypeFilterStatusProp.dispatCenter.enabled}
          onChange={() => changeErrorOrStatusType('dispatCenter')}
        />
        Diszpécser központ
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorTypeFilterStatusProp.vehicleUnit.enabled}
          onChange={() => changeErrorOrStatusType('vehicleUnit')}
        />
        Járműegység
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorTypeFilterStatusProp.other.enabled}
          onChange={() => changeErrorOrStatusType('other')}
        />
        Egyéb
      </Option>
      <BlockName>Státusz</BlockName>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatusProp.reported.enabled}
          onChange={() => changeErrorOrStatusType('reported')}
        />
        Hiba bejelentve
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatusProp.reported.enabled}
          onChange={() => changeErrorOrStatusType('reportAppended')}
        />
        Bejelentés kiegészítve
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatusProp.goingOn.enabled}
          onChange={() => changeErrorOrStatusType('goingOn')}
        />
        Hibajavítás folyamatban
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatusProp.waitingForInformation.enabled}
          onChange={() => changeErrorOrStatusType('waitingForInformation')}
        />
        Információra vár
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatusProp.serviceRecommended.enabled}
          onChange={() => changeErrorOrStatusType('serviceRecommended')}
        />
        Szervizre javasolva
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatusProp.repaired.enabled}
          onChange={() => changeErrorOrStatusType('repaired')}
        />
        Javítás befejezve
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatusProp.answered.enabled}
          onChange={() => changeErrorOrStatusType('answered')}
        />
        Megválaszolva
      </Option>
      <Option>
        <Overlay.Container>
          {overlay => (
            <Block>
              <Button use={Overlay.Show} {...overlay}>
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
      </Option>
    </TypeAndSatusText>
  );
};

export default TypeAndStatus;
