import styled from 'styled-components';
import { Button as ReakitButton } from 'reakit';

export const TypeAndSatusText = styled.div`
  display: table-cell;
  justify-self: center;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 1;
  text-align: left;
  justify-content: space-around;
  padding: 10px 10px;
  border: 1px solid lightgray;
  height: 970px;
  max-height: 970px;
  background-color: #f8f8f8;
  color: #696969;
  font-weight: 300;
  border-radius: 5px;
  text-align: left;
`;

export const BlockName = styled.div`
  text-align: left;
  margin: 10px 10px;
  padding: 2px 1px;
  font-weight: 500;
  color: black;
`;

export const Option = styled.div`
  text-align: left;
  margin: 1px 0px;
  padding: 2px 20px;
`;

export const Button = styled(ReakitButton)`
  text-align: center;
  background-color: orange;
  padding: 10px 20px 10px 20px;
  margin-top: 20px;
  margin-left: 35px;
  cursor: pointer;
`;
