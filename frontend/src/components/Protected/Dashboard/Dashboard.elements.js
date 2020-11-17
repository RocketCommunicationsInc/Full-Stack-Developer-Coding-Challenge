/** @format */

import styled from "styled-components";

export const MainDiv = styled.div`
  display: flex;
  height: 100vh;

  @media (max-width: 920px) {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
`;

export const AlertDataDiv = styled.div`
  height: 100%;
  flex: 1;

  @media (max-width: 920px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 50vh;
  }
`;

export const PaneDiv = styled.div`
  height: 2rem;
  background-color: #203246;
  font-size: x-large;
  color: #a9b2bc;
  padding-left: 1rem;
`;

export const RightMainDiv = styled.div`
  width: 55%;

  @media (max-width: 920px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

export const CardDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #182635;
  height: 50%;

  @media (max-width: 920px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
  }
`;
