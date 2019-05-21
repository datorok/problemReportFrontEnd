import React from 'react';
import { Input, Block, Backdrop, Portal, Overlay } from 'reakit';
import AddNewProblemReport from './AddNewProblemReport';
import { ProblemContainerObject } from '../containers/ProblemContainer';
import {
  TypeAndSatusText,
  BlockName,
  Option,
  Button,
} from './TypeAndStatus.style';

const errorType1 = ' Diszpécser központ';
const errorType2 = ' Járműegység';
const errorType3 = ' Egyéb';
const status0 = ' Hiba bejelentve';
const status1 = ' Bejelentés kiegészítve';
const status2 = ' Feldolgozás alatt';
const status3 = ' Várakozás információra';
const status4 = ' Szervizre rendelve';
const status5 = ' Szervizelés alatt';
const status6 = ' Javítás befejezve';
const status7 = ' Megválaszolva';

const TypeAndStatus = props => {
  const {
    errorTypeFilterStatus,
    errorFilterStatus,
    ProblemReportArr,
  } = ProblemContainerObject.state;

  const { changeErrorOrStatusType } = props;

  return (
    <TypeAndSatusText>
      <BlockName>Hiba típusa</BlockName>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorTypeFilterStatus.dispatCenter.enabled}
          onChange={() => changeErrorOrStatusType('dispatCenter')}
        />
        {errorType1}
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorTypeFilterStatus.vehicleUnit.enabled}
          onChange={() => changeErrorOrStatusType('vehicleUnit')}
        />
        {errorType2}
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorTypeFilterStatus.other.enabled}
          onChange={() => changeErrorOrStatusType('other')}
        />
        {errorType3}
      </Option>
      <BlockName>Státusz</BlockName>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatus.new.enabled}
          onChange={() => changeErrorOrStatusType('new')}
        />
        {status0}
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatus.appended.enabled}
          onChange={() => changeErrorOrStatusType('appended')}
        />
        {status1}
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatus.goingOn.enabled}
          onChange={() => changeErrorOrStatusType('goingOn')}
        />
        {status2}
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatus.waitingForInformation.enabled}
          onChange={() => changeErrorOrStatusType('waitingForInformation')}
        />
        {status3}
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatus.serviceRecommended.enabled}
          onChange={() => changeErrorOrStatusType('serviceRecommended')}
        />
        {status4}
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatus.underRepair.enabled}
          onChange={() => changeErrorOrStatusType('underRepair')}
        />
        {status5}
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatus.ready.enabled}
          onChange={() => changeErrorOrStatusType('ready')}
        />
        {status6}
      </Option>
      <Option>
        <Input
          type="checkbox"
          className="option"
          defaultChecked={errorFilterStatus.answered.enabled}
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
                  ProblemReportArr={ProblemReportArr}
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
