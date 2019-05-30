import { Container } from 'unstated';
import axios from 'axios';

export default class ProblemContainer extends Container {
  state = {
    ProblemReportArr: [],
    loading: true,

    errorTypeFilterStatus: {
      dispatCenter: { enabled: false, value: 'diszpécserközpont' },
      vehicleUnit: { enabled: true, value: 'járműegység' },
      other: { enabled: true, value: 'egyéb' },
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

  getFilteredProblemArr2 = () => {
    const FilterStatus = Object.values(this.state.errorTypeFilterStatus);
    const activeFilterStatus = FilterStatus.filter(
      filter => filter.enabled === true
    );
    const activeFilterStatusValues = [];

    for (let i = 0; i < activeFilterStatus.length; i++) {
      activeFilterStatusValues.push(activeFilterStatus[i].value);
      if (activeFilterStatus[i].value === 'egyéb') {
        activeFilterStatusValues.push('egyik_sem');
      }
    }

    if (activeFilterStatusValues.includes('egyéb')) {
      activeFilterStatusValues.push('egyik_sem');
    }
    const ErrorFilterStatus = Object.values(this.state.errorFilterStatus);
    const activeErrorFilterStatus = ErrorFilterStatus.filter(
      filter => filter.enabled === true
    );
    const activeErrorFilterStatusNumValue = [];
    for (let i = 0; i < activeErrorFilterStatus.length; i++) {
      activeErrorFilterStatusNumValue.push(
        activeErrorFilterStatus[i].alphValue
      );
    }
    const arrToReturn = this.state.ProblemReportArr.filter(element =>
      activeFilterStatusValues.includes(element.errorType)
    );
    const arrToReturnFinal = arrToReturn.filter(
      element => !activeErrorFilterStatusNumValue.includes(element)
    );
    console.log('arrToReturnFinal');
    console.log(arrToReturnFinal.length);
    return arrToReturnFinal;
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

  fetch = async () => {
    const { data } = await axios.get('http://localhost:8091/hibalistajson');
    this.setState({ ProblemReportArr: data, loading: false });
    console.log({ data });
  };
}

export const ProblemContainerObject = new ProblemContainer();
