import styled from 'styled-components';
import { Input as ReakitInput } from 'reakit';

export const ProblemItemRow = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  display: flex;
  align-items: center;
  width: 500px;
  justify-content: space-around;
  flex-direction: row;
`;
export const OpenTicketProblemItemRow = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  display: flex;
  align-items: left;
  width: 500px;
  justify-content: space-around;
  flex-direction: row;
  border: 1px solid lightgray;
  margin: 2px;
`;
export const OpenTicketBasicData = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  display: flex;
  align-items: left;
  width: 430px;
  justify-content: space-around;
  flex-direction: row;
  margin: 2px;
`;
export const ProblemItem1 = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  align-items: center;
  margin: 5px 5px;
  width: 30%;
  min-width: 30%;
  max-width: 30%;
`;
export const ProblemItem2 = styled.div`
  overflow: 'scroll';
  align-items: center;
  flex-direction: row;
  width: 70%;
  min-width: 70%;
  max-width: 70%;
`;
export const ProblemItem3 = styled.div`
  overflow: 'scroll';
  align-items: center;
  flex-direction: row;
  width: 25%;
  min-width: 25%;
  max-width: 25%;
`;
export const ProblemItem4 = styled.div`
  overflow: 'scroll';
  align-items: center;
  flex-direction: row;
  width: 75%;
  min-width: 75%;
  max-width: 75%;
`;
export const ProblemItem5 = styled.div`
  flex-direction: row;
  width: 30%;
  min-width: 30%;
  max-width: 30%;
  margin-top: 10px;
  margin-bottom: 10px;
`;
export const ProblemItem6 = styled.div`
  flex-direction: row;
  width: 30%;
  min-width: 30%;
  max-width: 30%;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: 'center';
  border: '1px solid black';
  padding: '10px';
`;

export const ElementportalModalButtons = styled.div`
  float: right;
  text-align: right;
  margin: 5px;
`;

export const NewTicketHead = styled.div`
  text-align: center;
  font-size: 25px;
  font-weight: 400;
  margin-top: 0px;
  margin-bottom: 30px;
`;

export const input = styled.div`
  text-align: left;
  color: black;
  width: 150px;
  padding: 5px 5px;
  margin: 2px;
`;

export const ElementPortalModal = styled.div`
  text-align: left;
  width: 490px;
  min-width: 490px;
  max-width: 490px;
  padding: 20px 20px;
  margin: 0px;
`;

export const Input = styled(ReakitInput)`
  text-align: left;
  width: 300px;
  border: 1px solid lightgray;
`;

export const Longtextarea = styled.textarea`
  color: black;
  width: 490px;
  height: 60px;
  padding: 5px 5px;
  margin: 2px;
  border: 1px solid lightgray;
`;

export const OpenTicketDescription = styled.div`
  margin-top: 10px;
  margin-bottom: 5px;
`;

export const AnimationLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;
