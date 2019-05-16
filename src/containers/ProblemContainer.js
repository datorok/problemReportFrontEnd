import { Container } from 'unstated';
import axios from 'axios';

export default class ProblemContainer extends Container {
  state = {
    ProblemReportArr: [],
    loading: true,
  };

  fetch = async () => {
    const { data } = await axios.get('http://localhost:8091/hibalistajson');
    this.setState({ ProblemReportArr: data, loading: false });
    console.log({ data });
  };
}

export const ProblemContainerObject = new ProblemContainer();
