import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import { ClimbingBoxLoader } from 'react-spinners';
import TypeAndStatus from '../components/TypeAndStatus';
import ProblemReport from '../components/ProblemReport';
import ProblemContainer, { ProblemContainerObject } from './ProblemContainer';
import { Application, AnimationLoader } from './App.style';

class App extends Component {
  componentDidMount() {
    const { sessionId } = this.props;
    console.log(`sessionId in App.js: ${sessionId}`);
    ProblemContainerObject.fetchProblemReportList(sessionId);
    ProblemContainerObject.fetchVehicleList();
  }

  licencePlateChangeHandler = event => {
    const actProblemReportArr = [...ProblemContainerObject.state];
    const filteredProblemReportArr = actProblemReportArr.filter(problemReport =>
      problemReport.licencePlateNumber
        .toUpperCase()
        .includes(event.target.value.toUpperCase())
    );
    ProblemContainerObject.setState({ filteredProblemReportArr });
  };

  render() {
    return (
      <Subscribe to={[ProblemContainer]}>
        {problemStore =>
          ProblemContainerObject.state.loadingProblemReportArr ? (
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
