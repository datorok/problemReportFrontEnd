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
      licenceNumberOrderIsAscending: true,
      reportDateOrderIsAscending: true,
    };
  }

  licencePlateChangeHandler = event => {
    const { ProblemReportArr } = ProblemContainerObject.state;
    const actProblemReportArr = [...ProblemReportArr];
    const filteredProblemReportArr = actProblemReportArr.filter(problemReport =>
      problemReport.licencePlateNumber
        .toUpperCase()
        .includes(event.target.value.toUpperCase())
    );
    ProblemContainerObject.setState({ filteredProblemReportArr });
  };

  // A sortMethod metódus végzi a rendszám- és a bejelentés ideje alapján történő sorbarendezést

  sortMethod = typeOfSorting => {
    let {
      ProblemReportArr,
      filteredProblemReportArr,
    } = ProblemContainerObject.state;

    const {
      licenceNumberOrderIsAscending,
      reportDateOrderIsAscending,
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
        });
        ProblemContainerObject.setState({
          filteredProblemReportArr,
        });
      } else {
        this.setState({
          licenceNumberOrderIsAscending: false,
        });
        ProblemContainerObject.setState({
          filteredProblemReportArr,
        });
      }
    } else if (isAscending === false) {
      if (typeOfSorting === 'numeric') {
        this.setState({
          reportDateOrderIsAscending: true,
        });
        ProblemContainerObject.setState({
          filteredProblemReportArr,
        });
      } else {
        this.setState({
          licenceNumberOrderIsAscending: true,
        });
        ProblemContainerObject.setState({
          filteredProblemReportArr,
        });
      }
    }
  };

  componentDidMount() {
    ProblemContainerObject.fetch();
  }

  render() {
    const { filteredProblemReportArr } = ProblemContainerObject.state;
    const {
      licenceNumberOrderIsAscending,
      reportDateOrderIsAscending,
    } = this.state;
    const { filterErrorChangeHandler, filterStatusChangeHandler } = this.props;
    let result = null;

    if (filteredProblemReportArr === undefined) {
      result = filterErrorChangeHandler;
      result = filterStatusChangeHandler;
    } else {
      result = filterErrorChangeHandler;
      result = filterStatusChangeHandler;
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
                errorTypeFilterStatus={problemStore.errorTypeFilterStatus}
                errorFilterStatus={problemStore.state.errorFilterStatus}
                changeErrorOrStatusType={problemStore.changeErrorOrStatusType}
                problemReportArr={problemStore.state.ProblemReportArr}
              />
              <ProblemReport
                licenceNumberOrderIsAscending={licenceNumberOrderIsAscending}
                reportDateOrderIsAscending={reportDateOrderIsAscending}
                sortMethod={this.sortMethod}
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
