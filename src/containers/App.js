import React, { Component } from 'react';
import './App.css';
import ProblemReport from '../components/ProblemReport';
import TypeAndStatus from '../components/TypeAndStatus';
import { Application, SearchBar } from './App.style';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredProblemReportArr: undefined,
      ProblemReportArr: [
        {
          id: 1,
          licencePlateNumber: 'ABC-129',
          reportCreationTime: '2019.03.24',
          actualStatus: 'Hiba bejelentve',
          errorType: 'Egyéb',
          reporterName: 'Ó Pál',
          reporterEmail: 'pal.o@gmail.com',
          reporterPhone: '+36705555555',
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
          licencePlateNumber: 'ABC-194',
          reportCreationTime: '2019.03.25',
          actualStatus: 'Hibajavítás folyamatban',
          errorType: 'Diszpécser központ',
          reporterName: 'Ló Péter',
          reporterEmail: 'peter.lo@gmail.com',
          reporterPhone: '+36705555556',
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
          reporterName: 'Lenti Lenke',
          reporterEmail: 'lenke.lenti@gmail.com',
          reporterPhone: '+36705555557',
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
          licencePlateNumber: 'ABC-127',
          reportCreationTime: '2019.03.21',
          actualStatus: 'Javítás befejezve',
          errorType: 'Járműegység',
          reporterName: 'Lapos Lajos',
          reporterEmail: 'lajos.lapos@gmail.com',
          reporterPhone: '+36705555558',
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
        reportAppended: { enabled: true, value: 'Bejelentés kiegészítve' },
        goingOn: { enabled: true, value: 'Hibajavítás folyamatban' },
        waitingForInformation: { enabled: true, value: 'Információra vár' },
        serviceRecommended: { enabled: true, value: 'Szervizre javasolva' },
        repaired: { enabled: false, value: 'Javítás befejezve' },
        answered: { enabled: false, value: 'Megválaszolva' },
      },
      licenceNumberOrderIsAscending: true,
      reportDateOrderIsAscending: true,
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

  // A changeErrorOrStatusType metódus végzi a hiba típusa és a hibajegy státusza szerint történő filterezést

  changeErrorOrStatusType = fieldName => {
    const filterType =
      fieldName === 'dispatCenter' ||
      fieldName === 'vehicleUnit' ||
      fieldName === 'other'
        ? 'errorTypeChange'
        : 'statusChange';
    if (filterType === 'errorTypeChange') {
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
    } else {
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
    }
  };

  // A sortMethod metódus végzi a rendszám- és a bejelentés ideje alapján történő sorbarendezést

  sortMethod = typeOfSorting => {
    let {
      ProblemReportArr,
      licenceNumberOrderIsAscending,
      reportDateOrderIsAscending,
      filteredProblemReportArr,
    } = this.state;

    const isAscending =
      typeOfSorting === 'alphabethical'
        ? licenceNumberOrderIsAscending
        : reportDateOrderIsAscending;

    let x;
    let y;

    const actProblemReportArr =
      filteredProblemReportArr === undefined
        ? [...ProblemReportArr]
        : [...filteredProblemReportArr];
    actProblemReportArr.sort(function(a, b) {
      if (typeOfSorting === 'alphabethical') {
        x = a.licencePlateNumber.toLowerCase();
        y = b.licencePlateNumber.toLowerCase();
      } else {
        x = a.reportCreationTime.toLowerCase();
        y = b.reportCreationTime.toLowerCase();
      }
      if (isAscending === true) {
        if (x < y) {
          return -1;
        }
      } else if (x < y) {
        return 1;
      }
      if (isAscending === true) {
        if (x > y) {
          return 1;
        }
      } else if (x > y) {
        return -1;
      }
      return 0;
    });
    filteredProblemReportArr = [...actProblemReportArr];

    if (isAscending === true) {
      if (typeOfSorting === 'numeric') {
        this.setState({
          reportDateOrderIsAscending: false,
          filteredProblemReportArr,
        });
      } else {
        this.setState({
          licenceNumberOrderIsAscending: false,
          filteredProblemReportArr,
        });
      }
    } else if (isAscending === false) {
      if (typeOfSorting === 'numeric') {
        this.setState({
          reportDateOrderIsAscending: true,
          filteredProblemReportArr,
        });
      } else {
        this.setState({
          licenceNumberOrderIsAscending: true,
          filteredProblemReportArr,
        });
      }
    }
  };

  render() {
    const {
      errorTypeFilterStatus,
      errorFilterStatus,
      ProblemReportArr,
      filteredProblemReportArr,
      licenceNumberOrderIsAscending,
      reportDateOrderIsAscending,
    } = this.state;

    let result = null;

    if (filteredProblemReportArr === undefined) {
      result = this.filterErrorChangeHandler(ProblemReportArr);
      result = this.filterStatusChangeHandler(result);
    } else {
      result = this.filterErrorChangeHandler(filteredProblemReportArr);
      result = this.filterStatusChangeHandler(result);
    }

    return (
      <Application>
        <div className="TypeAndStatusCSS">
          <TypeAndStatus
            errorTypeFilterStatusProp={errorTypeFilterStatus}
            errorFilterStatusProp={errorFilterStatus}
            changeErrorOrStatusType={this.changeErrorOrStatusType}
            problemReportArr={ProblemReportArr}
          />
        </div>
        <div className="ProblemReportCSS">
          <SearchBar>
            <input
              type="text"
              placeholder="Keresés..."
              onChange={this.licencePlateChangeHandler}
            />
          </SearchBar>
          <ProblemReport
            problemReportArr={result}
            sortMethod={this.sortMethod}
            licenceNumberOrderIsAscending={licenceNumberOrderIsAscending}
            reportDateOrderIsAscending={reportDateOrderIsAscending}
          />
        </div>
      </Application>
    );
  }
}

export default App;
