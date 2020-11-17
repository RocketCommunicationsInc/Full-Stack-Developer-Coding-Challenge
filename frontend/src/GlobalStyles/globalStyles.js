/** @format */

import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  height: 100vh;
  background-color: #274059;
`;

export const MainText = styled.h1`
  color: #fff;
  padding: 1rem;
`;

export const ButtonLink = styled(Link)`
  list-style: none;
  cursor: pointer;
  text-decoration: none;
  color: rgb(58, 129, 191);

  :hover {
    color: #fff;
  }
`;

export const SmallText = styled.p`
  color: #fff;
`;

export const Input = styled.input`
  box-sizing: border-box;
  order: 2;
  height: 2.125rem;
  width: 100%;
  padding: 0 1rem;
  border: 1px solid var(--inputBorderColor, transparent);
  border-radius: 3px;
  font-size: var(--fontSize, 1rem);
  color: var(--inputTextColor, rgb(0, 0, 0));
  margin-top: 0.5rem;
`;

export const Button = styled.button`
  border-radius: 4px;
  background: ${({ primary }) => (primary ? "white" : "pink")};
  white-space: nowrap;
  padding: ${({ big }) => (big ? "12px 64px" : "10px 20px")};
  color: #fff;
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  cursor: pointer;

  &:hover {
    transition: all 0.3s ease-out;
    background: #fff;
    background: ${({ primary }) => (primary ? "#0467FB " : "#4b59f7")};
  }
  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

export const ContainerNav = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  padding-left: 50px;
  padding-right: 50px;

  @media screen and (max-width: 960px) {
    padding-left: 30px;
    padding-right: 30px;
  }
`;

export const Form = styled.form`
  text-align: -webkit-center;
`;

export const LargeRuxButton = styled.button`
  margin: 1rem;
  height: 2.875rem;
  padding: 0 1.5rem;
  font-size: var(--largeLabelFontSize, 1.125rem);
  color: #fff;
`;

export default Container;
