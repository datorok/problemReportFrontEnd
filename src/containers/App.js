import React, { Component } from 'react';

import { Subscribe } from 'unstated';
import { ClimbingBoxLoader } from 'react-spinners';
import TypeAndStatus from '../components/TypeAndStatus';
import ProblemReport from '../components/ProblemReport';
import ProblemContainer, { ProblemContainerObject } from './ProblemContainer';
import { Application, AnimationLoader } from './App.style';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredProblemReportArr: undefined,
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

  componentDidMount() {
    ProblemContainerObject.fetch();
  }

  render() {
    const {
      errorTypeFilterStatus,
      errorFilterStatus,
      filteredProblemReportArr,
      licenceNumberOrderIsAscending,
      reportDateOrderIsAscending,
    } = this.state;

    let result = null;

    if (filteredProblemReportArr === undefined) {
      result = this.filterErrorChangeHandler(
        ProblemContainerObject.state.ProblemReportArr
      );
      result = this.filterStatusChangeHandler(result);
    } else {
      result = this.filterErrorChangeHandler(filteredProblemReportArr);
      result = this.filterStatusChangeHandler(result);
    }

    return (
      <Subscribe to={[ProblemContainer]}>
        {problemStore =>
          ProblemContainerObject.state.loading ? (
            <AnimationLoader>
              <ClimbingBoxLoader sizeUnit="px" size={30} color="#ffa500" />
            </AnimationLoader>
          ) : (
            <Application>
              <TypeAndStatus
                errorTypeFilterStatusProp={errorTypeFilterStatus}
                errorFilterStatusProp={errorFilterStatus}
                changeErrorOrStatusType={this.changeErrorOrStatusType}
                problemReportArr={problemStore.state.ProblemReportArr}
              />
              <ProblemReport
                problemReportArr={result}
                sortMethod={this.sortMethod}
                licenceNumberOrderIsAscending={licenceNumberOrderIsAscending}
                reportDateOrderIsAscending={reportDateOrderIsAscending}
                licencePlateChangeHandler={this.licencePlateChangeHandler}
              />
            </Application>
          )
        }
      </Subscribe>
    );
  }
}

export default App;
