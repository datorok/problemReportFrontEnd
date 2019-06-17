import { Container } from 'unstated';
import axios from 'axios';

export default class ProblemContainer extends Container {
  sessionId = '';

  state = {
    ProblemReportArr: [],
    LicencePlateNumberArr: [],
    MixedArr: [],
    loadingProblemReportArr: true,
    loadingLicencePlateNumberArr: true,
    loadingMixedArr: true,

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

  init = async sessionId => {
    await this.fetchProblemReportList(sessionId || this.sessionId);
    await this.fetchVehicleList();
    await this.createMixedArr();
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

    let { data } = await axios.get(
      encodeURI(
        `http://localhost:8091/hibalistajson?sessionId=${this.sessionId}`
      )
    );
    data = data.sort((a, b) => {
      if (
        a.licencePlateNumber.toUpperCase() > b.licencePlateNumber.toUpperCase()
      ) {
        return 1;
      }
      if (
        a.licencePlateNumber.toUpperCase() < b.licencePlateNumber.toUpperCase()
      ) {
        return -1;
      }
      return 0;
    });
    this.setState({ ProblemReportArr: data, loadingProblemReportArr: false });
    console.log('ProblemReportArr.length in ProblemContainer: ');
    console.log(data.length);
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
    let { data } = await axios.get(
      encodeURI(
        `http://localhost:8091/jarmuvekjson?sessionId=${this.sessionId}`
      )
    );
    data = data.sort((a, b) => {
      if (
        a.vehicleLicencePlate.toUpperCase() >
        b.vehicleLicencePlate.toUpperCase()
      ) {
        return 1;
      }
      if (
        a.vehicleLicencePlate.toUpperCase() <
        b.vehicleLicencePlate.toUpperCase()
      ) {
        return -1;
      }
      return 0;
    });
    console.log('data.length: ');
    console.log(data.length);
    this.setState({
      LicencePlateNumberArr: data,
      loadingLicencePlateNumberArr: false,
    });
    return data;
  };

  persistNewProblem = async (
    reportId,
    prid,
    reporterName,
    reporterEmail,
    reporterPhone,
    errorTypeId,
    chosenVehicleId,
    vehicleLicencePlateNumber,
    problemDesc,
    reportCreationTime,
    actualStatusId,
    params
  ) => {
    const temp = {
      reportId,
      prid,
      reporterName,
      reporterEmail,
      reporterPhone,
      errorTypeId,
      chosenVehicleId,
      vehicleLicencePlateNumber,
      problemDesc,
      reportCreationTime,
      actualStatusId,
      params,
    };
    console.log('TEMPOBJECTBEFORESENDING:');
    console.log(temp);
    const { data } = await axios.post(
      `http://localhost:8091/problemreportpersist?sessionId=${this.sessionId}`,
      {
        prid,
        id: reportId,
        reporterName,
        reporterEmail,
        reporterPhoneNumber: reporterPhone,
        errorTypeId,
        vehicleId: chosenVehicleId,
        licencePlateNumber: vehicleLicencePlateNumber,
        problemDescription: problemDesc,
        reportCreationTime,
        actualStatusId,
        params,
      },
      {
        'Content-Type': 'application/json',
      }
    );
  };

  createMixedArr = async () => {
    const mixedArr = [...this.state.LicencePlateNumberArr];
    console.log(`mixedArr.length: ${mixedArr.length}`);
    for (let i = 0; i < mixedArr.length; i++) {
      if (
        this.state.ProblemReportArr.find(
          obj =>
            obj.licencePlateNumber.toUpperCase() ===
              mixedArr[i].vehicleLicencePlate.toUpperCase() &&
            obj.actualStatusId !== 4 &&
            obj.actualStatusId !== 5
        )
      ) {
        console.log(`TRUE: ${mixedArr[i].vehicleLicencePlate}`);
        mixedArr[i].id = this.state.ProblemReportArr.find(
          obj =>
            obj.licencePlateNumber.toUpperCase() ===
              mixedArr[i].vehicleLicencePlate.toUpperCase() &&
            obj.actualStatusId !== 4 &&
            obj.actualStatusId !== 5
        ).id;
        mixedArr[i].actualStatusId = this.state.ProblemReportArr.find(
          obj =>
            obj.licencePlateNumber.toUpperCase() ===
              mixedArr[i].vehicleLicencePlate.toUpperCase() &&
            obj.actualStatusId !== 4 &&
            obj.actualStatusId !== 5
        ).actualStatusId;
        mixedArr[i].actualStatusName = this.state.ProblemReportArr.find(
          obj =>
            obj.licencePlateNumber.toUpperCase() ===
              mixedArr[i].vehicleLicencePlate.toUpperCase() &&
            obj.actualStatusId !== 4 &&
            obj.actualStatusId !== 5
        ).actualStatusName;
        mixedArr[i].errorType = this.state.ProblemReportArr.find(
          obj =>
            obj.licencePlateNumber.toUpperCase() ===
              mixedArr[i].vehicleLicencePlate.toUpperCase() &&
            obj.actualStatusId !== 4 &&
            obj.actualStatusId !== 5
        ).errorType;
        mixedArr[i].errorTypeId = this.state.ProblemReportArr.find(
          obj =>
            obj.licencePlateNumber.toUpperCase() ===
              mixedArr[i].vehicleLicencePlate.toUpperCase() &&
            obj.actualStatusId !== 4 &&
            obj.actualStatusId !== 5
        ).errorTypeId;
        mixedArr[i].problemDescription = this.state.ProblemReportArr.find(
          obj =>
            obj.licencePlateNumber.toUpperCase() ===
              mixedArr[i].vehicleLicencePlate.toUpperCase() &&
            obj.actualStatusId !== 4 &&
            obj.actualStatusId !== 5
        ).problemDescription;
        mixedArr[i].reporterName = this.state.ProblemReportArr.find(
          obj =>
            obj.licencePlateNumber.toUpperCase() ===
              mixedArr[i].vehicleLicencePlate.toUpperCase() &&
            obj.actualStatusId !== 4 &&
            obj.actualStatusId !== 5
        ).reporterName;
        mixedArr[i].actualStatusColor = this.state.ProblemReportArr.find(
          obj =>
            obj.licencePlateNumber.toUpperCase() ===
              mixedArr[i].vehicleLicencePlate.toUpperCase() &&
            obj.actualStatusId !== 4 &&
            obj.actualStatusId !== 5
        ).actualStatusColor;
        mixedArr[i].reportCreationTime = this.state.ProblemReportArr.find(
          obj =>
            obj.licencePlateNumber.toUpperCase() ===
              mixedArr[i].vehicleLicencePlate.toUpperCase() &&
            obj.actualStatusId !== 4 &&
            obj.actualStatusId !== 5
        ).reportCreationTime;
        mixedArr[i].prid = this.state.ProblemReportArr.find(
          obj =>
            obj.licencePlateNumber.toUpperCase() ===
              mixedArr[i].vehicleLicencePlate.toUpperCase() &&
            obj.actualStatusId !== 4 &&
            obj.actualStatusId !== 5
        ).prid;
        mixedArr[i].params = this.state.ProblemReportArr.find(
          obj =>
            obj.licencePlateNumber.toUpperCase() ===
              mixedArr[i].vehicleLicencePlate.toUpperCase() &&
            obj.actualStatusId !== 4 &&
            obj.actualStatusId !== 5
        ).params;
      }
    }
    mixedArr.sort((a, b) => {
      if (a.actualStatusId !== undefined && b.actualStatusId === undefined) {
        return -1;
      }
      if (b.actualStatusId !== undefined && a.actualStatusId === undefined) {
        return 1;
      }
      return 0;
    });
    this.setState({ MixedArr: mixedArr, loadingMixedList: false });
    console.log('createMixedArr.length in ProblemContainer: ');
    console.log(mixedArr);

    return mixedArr;
  };
}
export const ProblemContainerObject = new ProblemContainer();
