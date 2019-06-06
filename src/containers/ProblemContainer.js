import { Container } from 'unstated';
import axios from 'axios';

export default class ProblemContainer extends Container {
  sessionId = '';

  state = {
    ProblemReportArr: [],
    loading: true,

    errorTypeFilterStatus: {
      noneOfThem: {
        enabled: true,
        numValue: 0,
        alphValue: '0',
        value: 'egyik_sem',
      },
      dispatCenter: {
        enabled: true,
        numValue: 1,
        alphValue: '1',
        value: 'diszpécserközpont',
      },
      vehicleUnit: {
        enabled: true,
        numValue: 2,
        alphValue: '2',
        value: 'járműegység',
      },
      other: { enabled: true, numValue: 3, alphValue: '3', value: 'egyéb' },
    },

    errorFilterStatus: {
      new: {
        enabled: true,
        numValue: 0,
        alphValue: '0',
        value: 'Hiba bejelentve',
      },
      appended: {
        enabled: true,
        numValue: 6,
        alphValue: '6',
        value: 'Bejelentés kiegészítve',
      },
      goingOn: {
        enabled: true,
        numValue: 1,
        alphValue: '1',
        value: 'Hibajavítás folyamatban',
      },
      waitingForInformation: {
        enabled: true,
        numValue: 2,
        alphValue: '2',
        value: 'Információra vár',
      },
      serviceRecommended: {
        enabled: true,
        numValue: 3,
        alphValue: '3',
        value: 'Szervizre javasolva',
      },
      underRepair: {
        enabled: true,
        numValue: 7,
        alphValue: '7',

        value: 'Javítás folyamatban',
      },
      ready: {
        enabled: false,
        numValue: 4,
        alphValue: '4',
        value: 'Javítás befejezve',
      },
      answered: {
        enabled: false,
        numValue: 5,
        alphValue: '5',
        value: 'Megválaszolva',
      },
    },
  };

  // errorTypeFilterStatusArr.alphValue
  getFilteredProblemArr2 = () => {
    const errorTypeFilterStatus = Object.values(
      this.state.errorTypeFilterStatus
    );
    const errorTypeFilterStatusArr = errorTypeFilterStatus.filter(
      filter => filter.enabled === true
    );
    let errorTypeFilterStatusValuesArr = [];

    for (let i = 0; i < errorTypeFilterStatusArr.length; i++) {
      errorTypeFilterStatusValuesArr.push(
        errorTypeFilterStatusArr[i].alphValue
      );
    }
    if (!errorTypeFilterStatusValuesArr.includes('13')) {
      errorTypeFilterStatusValuesArr = errorTypeFilterStatusValuesArr.filter(
        element => element !== '10'
      );
    }
    const ErrorFilterStatus = Object.values(this.state.errorFilterStatus);
    const errorStateFilterArr = ErrorFilterStatus.filter(
      element => element.enabled === true
    );
    const errorStateFilterValuesArr = [];
    for (let i = 0; i < errorStateFilterArr.length; i++) {
      errorStateFilterValuesArr.push(errorStateFilterArr[i].alphValue);
    }
    let arrToReturn = [];
    for (let i = 0; i < this.state.ProblemReportArr.length; i++) {
      if (
        errorTypeFilterStatusValuesArr.includes(
          this.state.ProblemReportArr[i].errorTypeId.toString()
        )
      ) {
        arrToReturn.push(this.state.ProblemReportArr[i]);
      }
    }
    for (let i = 0; i < arrToReturn.length; i++) {
      if (
        !errorStateFilterValuesArr.includes(
          arrToReturn[i].actualStatusId.toString()
        )
      ) {
        delete arrToReturn[i];
      }
    }
    arrToReturn = arrToReturn.filter(element => element !== undefined);
    return arrToReturn;
  };

  changeErrorOrStatusType = fieldName => {
    const { errorTypeFilterStatus, errorFilterStatus } = this.state;
    const filterType =
      fieldName === 'dispatCenter' ||
      fieldName === 'vehicleUnit' ||
      fieldName === 'other'
        ? 'errorTypeChange'
        : 'statusChange';
    if (filterType === 'errorTypeChange') {
      this.setState({
        errorTypeFilterStatus: {
          ...errorTypeFilterStatus,
          [fieldName]: {
            ...errorTypeFilterStatus[fieldName],
            enabled: !errorTypeFilterStatus[fieldName].enabled,
          },
        },
      });
    } else {
      this.setState({
        errorFilterStatus: {
          ...errorFilterStatus,
          [fieldName]: {
            ...errorFilterStatus[fieldName],
            enabled: !errorFilterStatus[fieldName].enabled,
          },
        },
      });
    }
  };

  fetchProblemReportList = async sessionId => {
    this.sessionId = sessionId;
    const { data } = await axios.get(
      encodeURI(
        `http://localhost:8091/hibalistajson?sessionId=${this.sessionId}`
      )
    );
    this.setState({ ProblemReportArr: data, loading: false });
  };

  /**
   * térjen vissza egy changelist tömbbbbbel
   * ezt a választ a react-od megvárja
   * és vigég megy rajta .map-el
   * ami kigenerálja a jsx elmenteket
   */

  fetchChangeList = async problemReportId => {
    const { data } = await axios.get(
      encodeURI(
        `http://localhost:8091/valtozasjson?sessionId=${
          this.sessionId
        }&problemReportId=${problemReportId}`
      )
    );
    return data;
  };

  fetchVehicleList = async () => {
    console.log('this.sessionId of fetchVehicleList: ');
    console.log(this.sessionId);
    const { data } = await axios.get(
      encodeURI(
        `http://localhost:8091/jarmuvekjson?sessionId=${this.sessionId}`
      )
    );
    console.log('fetchVehicleListData: ');
    console.log({ data });
    return data;
  };
}
export const ProblemContainerObject = new ProblemContainer();
