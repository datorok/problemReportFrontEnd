import styled from 'styled-components';

export const Application = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: 20% 79%;
  grid-template-rows: 100%;
  max-width: 1920px;
`;

export const SecondColomn = styled.div`
  width: 100%;
  max-width: 1450px;
  display: table-cell;
  justify-self: center;
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 1;
  height: 950px;
  max-height: 950px;
  border: 1px solid #1e90ff;
`;

export const Input = styled.input`
  width: 400px;
  max-width: 400px;
  min-width: 400px;
  height: 15px;
  display: inline-block;
  justify-content: space-around;
  padding: 3px 3px;
  margin: 20px;
`;
