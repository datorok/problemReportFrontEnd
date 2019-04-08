import React, { Component } from 'react';
import './App.css';
import ProblemReport from '../components/ProblemReport';
import TypeAndStatus from '../components/TypeAndStatus';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredProblemReportArr: undefined,
      ProblemReportArr: [
        {
          id: 1,
          licencePlateNumber: 'ABC-123',
          reportCreationTime: '2019.03.24',
          actualStatus: 'Hiba bejelentve',
          errorType: 'Egyéb',
          reporterName: 'Ó Pál',
          problemReportChangeList: [
            {
              id: 1,
              stateChangeTime: '2019.03.26',
              stateChangeMessage:
                'Sziasztok, 03.24-én volt egy nagy akadása a járműegységnek, nem volt GPS adatforgalom',
            },
          ],
        },

        {
          id: 2,
          licencePlateNumber: 'ABC-124',
          reportCreationTime: '2019.03.25',
          actualStatus: 'Hibajavítás folyamatban',
          errorType: 'Diszpécser központ',
          reporterName: 'Ló Péter',
          problemReportChangeList: [
            {
              id: 1,
              stateChangeTime: '2019.03.25',
              stateChangeMessage:
                'Sziasztok, Legyetek szívesek leellenőrizni a tankszondák működését!',
            },
            {
              id: 2,
              stateChangeTime: '2019.03.26',
              stateChangeMessage:
                'Szia, a tapasztalt probléma megoldásához a jármű szervizelését javasoljuk!',
            },
          ],
        },
        {
          id: 3,
          licencePlateNumber: 'ABC-125',
          reportCreationTime: '2019.03.26',
          actualStatus: 'Megválaszolva',
          errorType: 'Járműegység',
          reporterName: 'Lenti Lajos',
          problemReportChangeList: [
            {
              id: 1,
              stateChangeTime: '2019.03.26',
              stateChangeMessage:
                'Sziasztok, Legyetek szívesek ellenőrizni a járműegységek működését!',
            },
            {
              id: 2,
              stateChangeTime: '2019.03.26',
              stateChangeMessage:
                'Szia, a tapasztalt probléma megoldásához a jármű szervizelését javasoljuk!',
            },
          ],
        },
        {
          id: 4,
          licencePlateNumber: 'ABC-136',
          reportCreationTime: '2019.03.26',
          actualStatus: 'Javítás befejezve',
          errorType: 'Járműegység',
          reporterName: 'Lenti Lajos',
          problemReportChangeList: [
            {
              id: 1,
              stateChangeTime: '2019.03.26',
              stateChangeMessage:
                'Sziasztok, Legyetek szívesek ellenőrizni a járműegységek működését!',
            },
            {
              id: 2,
              stateChangeTime: '2019.03.26',
              stateChangeMessage:
                'Szia, a tapasztalt probléma megoldásához a jármű szervizelését javasoljuk!',
            },
          ],
        },
      ],
      errorTypeFilterStatus: {
        dispatCenter: { enabled: true, value: 'Diszpécser központ' },
        vehicleUnit: { enabled: true, value: 'Járműegység' },
        other: { enabled: true, value: 'Egyéb' },
      },
      errorFilterStatus: {
        reported: { enabled: true, value: 'Hiba bejelentve' },
        goingOn: { enabled: true, value: 'Hibajavítás folyamatban' },
        waitingForInformation: { enabled: true, value: 'Információra vár' },
        serviceRecommended: { enabled: true, value: 'Szervizre javasolva' },
        repaired: { enabled: false, value: 'Javítás befejezve' },
        answered: { enabled: false, value: 'Megválaszolva' },
      },
    };
  }

  licencePlateChangeHandler = event => {
    const { ProblemReportArr } = this.state;
    const actProblemReportArr = [...ProblemReportArr];
    const filteredProblemReportArr = actProblemReportArr.filter(problemReport =>
      problemReport.licencePlateNumber
        .toUpperCase()
        .includes(event.target.value.toUpperCase())
    );
    this.setState({ filteredProblemReportArr });
  };

  filterErrorChangeHandler = ProblemReportArr => {
    const { errorTypeFilterStatus } = this.state;
    const activeErrorTypeArr = Object.values(errorTypeFilterStatus);
    const actProblemReportArr = [...ProblemReportArr];
    const filteredProblemReportArr = actProblemReportArr.filter(
      problemReport =>
        activeErrorTypeArr.find(
          errorTypeToFilter =>
            errorTypeToFilter.value === problemReport.errorType
        ).enabled
    );
    return filteredProblemReportArr;
  };

  filterStatusChangeHandler = ProblemReportArr => {
    const { errorFilterStatus } = this.state;
    const activeFilterStatusArr = Object.values(errorFilterStatus);
    const actProblemReportArr = [...ProblemReportArr];
    const filteredProblemReportArr = actProblemReportArr.filter(
      problemReport =>
        activeFilterStatusArr.find(
          filterStateToFilter =>
            filterStateToFilter.value === problemReport.actualStatus
        ).enabled
    );
    return filteredProblemReportArr;
  };

  changeErrorType = fieldName => {
    const { errorTypeFilterStatus } = this.state;
    this.setState({
      errorTypeFilterStatus: {
        ...errorTypeFilterStatus,
        [fieldName]: {
          ...errorTypeFilterStatus[fieldName],
          enabled: !errorTypeFilterStatus[fieldName].enabled,
        },
      },
    });
  };

  changeStatusType = fieldName => {
    const { errorFilterStatus } = this.state;

    this.setState({
      errorFilterStatus: {
        ...errorFilterStatus,
        [fieldName]: {
          ...errorFilterStatus[fieldName],
          enabled: !errorFilterStatus[fieldName].enabled,
        },
      },
    });
  };

  render() {
    const { errorTypeFilterStatus, errorFilterStatus } = this.state;
    const { ProblemReportArr, filteredProblemReportArr } = this.state;

    let result = null;

    if (filteredProblemReportArr === undefined) {
      result = this.filterErrorChangeHandler(ProblemReportArr);
      result = this.filterStatusChangeHandler(result);
    } else {
      result = this.filterErrorChangeHandler(filteredProblemReportArr);
      result = this.filterStatusChangeHandler(result);
    }

    return (
      <div className="App">
        <div className="TypeAndStatusCSS">
          <TypeAndStatus
            errorTypeFilterStatusProp={errorTypeFilterStatus}
            errorFilterStatusProp={errorFilterStatus}
            changeErrorType={this.changeErrorType}
            changeStatusType={this.changeStatusType}
          />
        </div>
        <div className="ProblemReportCSS">
          <br />
          <div>
            <input
              type="text"
              placeholder="Rendszám szűrése"
              onChange={this.licencePlateChangeHandler}
            />
          </div>
          <br />
          <ProblemReport problemReportArr={result} />
        </div>
      </div>
    );
  }
}

export default App;
