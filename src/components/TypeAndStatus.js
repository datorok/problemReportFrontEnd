import React from 'react';
import { Input, Block, Backdrop, Portal, Overlay } from 'reakit';
import AddNewProblemReport from './AddNewProblemReport';
import {
  TypeAndSatusText,
  BlockName,
  Option,
  Button,
} from './TypeAndStatus.style';

const errorType1 = ' Diszpécser központ';
const errorType2 = ' Járműegység';
const errorType3 = ' Egyéb';
const status1 = ' Hiba bejelentve';
const status2 = ' Bejelentés kiegészítve';
const status3 = ' Hibajavítás folyamatban';
const status4 = ' Információra vár';
const status5 = ' Szervizre javasolva';
const status6 = ' Javítás befejezve';
const status7 = ' Megválaszolva';

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
        {errorType1}
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorTypeFilterStatusProp.vehicleUnit.enabled}
          onChange={() => changeErrorOrStatusType('vehicleUnit')}
        />
        {errorType2}
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorTypeFilterStatusProp.other.enabled}
          onChange={() => changeErrorOrStatusType('other')}
        />
        {errorType3}
      </Option>
      <BlockName>Státusz</BlockName>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatusProp.reported.enabled}
          onChange={() => changeErrorOrStatusType('reported')}
        />
        {status1}
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatusProp.reported.enabled}
          onChange={() => changeErrorOrStatusType('reportAppended')}
        />
        {status2}
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatusProp.goingOn.enabled}
          onChange={() => changeErrorOrStatusType('goingOn')}
        />
        {status3}
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatusProp.waitingForInformation.enabled}
          onChange={() => changeErrorOrStatusType('waitingForInformation')}
        />
        {status4}
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatusProp.serviceRecommended.enabled}
          onChange={() => changeErrorOrStatusType('serviceRecommended')}
        />
        {status5}
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatusProp.repaired.enabled}
          onChange={() => changeErrorOrStatusType('repaired')}
        />
        {status6}
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatusProp.answered.enabled}
          onChange={() => changeErrorOrStatusType('answered')}
        />
        {status7}
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
