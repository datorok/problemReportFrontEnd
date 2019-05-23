import styled from 'styled-components';
import { Input as ReakitInput } from 'reakit';

export const Input = styled(ReakitInput)`
  width: 400px;
  max-width: 400px;
  min-width: 400px;
  height: 20px;
  display: inline-block;
  justify-content: space-around;
  padding: 3px 3px;
  margin: 20px;
  border: 1px solid lightgray;
`;
export const ProblemReportBlock = styled.div`
  width: 100%;
  max-width: 1750px;
  display: table-cell;
  justify-self: center;
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 1;
  min-height: 950px;
  border: 1px solid #1e90ff;
`;
export const ProblemRowContainer = styled.div`
  max-width: 1750px;
  padding: 10px;
`;
export const ProblemContainer = styled.div`
  max-width: 1750px;
  & ${ProblemRowContainer}:nth-child(even) {
    background: #e8e8e8 !important;
  }
`;
export const FlexHeader = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  display: flex;
  width: 98%;
  max-width: 1750px;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  color: #696969;
  font-size: 14px;
  /*ezzel felülbírálható a lokális formázás */
  & > * {
    font-weight: normal !important;
  }
`;
export const ProblemRow = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  display: flex;
  align-items: center;
  width: 98%;
  max-width: 1750px;
  justify-content: space-around;
  flex-direction: row;
`;
export const ProblemItem0 = styled.div`
  width: 2%;
  min-width: 2%;
  max-width: 2%;
`;
export const ProblemItem1 = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  width: 9%;
  min-width: 9%;
  max-width: 10%;
  font-weight: 500;
`;
export const ProblemItem2 = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  width: 13%;
  min-width: 13%;
  max-width: 14%;
`;
export const ProblemItem3 = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  width: 12%;
  min-width: 12%;
  max-width: 12%;
`;
export const ProblemItem4 = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  width: 13%;
  min-width: 10%;
  max-width: 13%;
`;
export const ProblemItem5 = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  width: 11%;
  min-width: 11%;
  max-width: 11%;
`;
export const ProblemItem6 = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  width: 40%;
  min-width: 40%;
  max-width: 40%;
  font-weight: 500;
`;
