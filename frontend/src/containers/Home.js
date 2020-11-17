/** @format */

import React from "react";
import Rocket from "../components/Rocket/Rocket";
import styled from "styled-components";
import { Container, MainText, ButtonLink } from "../GlobalStyles/globalStyles";

const ButtonDiv = styled.div`
  display: flex;
`;

const home = () => (
  <Container>
    <Rocket />
    <MainText>
      Welcome to Ground Resources <br /> Management Dashboard!
    </MainText>
    <ButtonDiv>
      <ButtonLink to="/login" role="button">
        <rux-button style={{ margin: "1rem" }} size="large">
          Login
        </rux-button>
      </ButtonLink>
      <ButtonLink to="/signup" role="button">
        <rux-button style={{ margin: "1rem" }} outline size="large">
          Sign Up
        </rux-button>
      </ButtonLink>
    </ButtonDiv>
  </Container>
);

export default home;
