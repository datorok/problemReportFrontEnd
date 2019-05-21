import { Container } from 'unstated';
import axios from 'axios';

export default class ProblemContainer extends Container {
  state = {
    ProblemReportArr: [],
    filteredProblemReportArr: undefined,
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

  getFilteredProblemArr = () => {
    const activeFilterStatus = Object.values(this.state.errorTypeFilterStatus);
    console.log('something');
    console.log(activeFilterStatus);
    const activeFilterStatus2 = activeFilterStatus.filter(
      filter => filter.enabled === true
    );
    console.log('something2');
    console.log(activeFilterStatus2);
    return this.state.ProblemReportArr.filter(() => problemReport =>
      activeFilterStatus.find(
        errorTypeToFilter => errorTypeToFilter.value === problemReport.errorType
      ).enabled
    );
  };

  getFilteredProblemArr2 = () => {
    const FilterStatus = Object.values(this.state.errorTypeFilterStatus);
    const activeFilterStatus = FilterStatus.filter(
      filter => filter.enabled === true
    );
    const activeFilterStatusValues = [];
    for (let i = 0; i < activeFilterStatus.length; i++) {
      activeFilterStatusValues.push(activeFilterStatus[i].value);
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
    console.log('something2');
    console.log(activeErrorFilterStatusNumValue);
    const arrToReturn = [];
    for (let i = 0; i < this.state.ProblemReportArr.length; i++) {
      if (
        activeFilterStatusValues.includes(
          this.state.ProblemReportArr[i].errorType
        )
      ) {
        arrToReturn.push(this.state.ProblemReportArr[i]);
      }
    }
    console.log('length');
    console.log(arrToReturn.length);
    for (let i = 0; i < arrToReturn.length; i++) {
      console.log('actStatus');
      console.log(arrToReturn[i].errorType);
      if (
        !activeErrorFilterStatusNumValue.includes(arrToReturn[i].actualStatus)
      ) {
        delete arrToReturn[i];
      }
    }
    const arrToReturnFinal = arrToReturn.filter(
      element => element !== undefined
    );

    return arrToReturnFinal;
  };

  filterStatusChangeHandler = async ProblemReportArr => {
    const actProblemReportArr = [...ProblemReportArr];
    const { errorFilterStatus } = this.state;
    const activeFilterStatusArr = Object.values(errorFilterStatus);
    const filteredProblemReportArr = actProblemReportArr.filter(
      problemReport =>
        activeFilterStatusArr.find(
          filterStateToFilter =>
            filterStateToFilter.value === problemReport.actualStatus
        ).enabled
    );
    return filteredProblemReportArr;
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
