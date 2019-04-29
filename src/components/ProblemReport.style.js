import styled from 'styled-components';

export const FlexHeader = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  display: flex;
  width: 95%;
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
  width: 95%;
  justify-content: space-around;
  flex-direction: row;
`;
export const ProblemItem0 = styled.div`
  width: 3%;
  min-width: 3%;
  max-width: 3%;
`;
export const ProblemItem1 = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  width: 10%;
  min-width: 10%;
  max-width: 10%;
  font-weight: 500;
`;
export const ProblemItem2 = styled.div`
  overflow: 'scroll';
  flex-direction: row;
  width: 14%;
  min-width: 14%;
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
  width: 10%;
  min-width: 10%;
  max-width: 10%;
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
export const ProblemRowContainer = styled.div`
  padding: 10px;
`;
export const ProblemContainer = styled.div`
  & ${ProblemRowContainer}:nth-child(even) {
    background: #e8e8e8 !important;
  }
`;