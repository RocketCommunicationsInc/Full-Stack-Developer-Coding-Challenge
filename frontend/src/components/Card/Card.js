/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import { rgba } from "polished";
import { PieChart, Pie } from "recharts";

const MainCard = styled.div`
  width: 250px;

  border-radius: 3rem;
  background-color: #182635;
`;
const ChartWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const ChartLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.875rem;
  color: ${rgba("white", 0.5)};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  text-align: center;
  transition: opacity 0.25s;
`;

const ChartLabelValue = styled.div`
  font-size: 1.75rem;
  color: ${rgba("white", 0.85)};
`;

//Fake Data for cards might add data if time allows
const data = [
  {
    name: "Lost",
    value: 672,
    fill: "#292929",
  },
  {
    name: "High",
    value: 462,
    fill: "#a200c1",
  },
  {
    name: "Moderate",
    value: 127,
    fill: "rgb(0, 90, 143)",
  },
  {
    name: "Low",
    value: 41,
    fill: "#00c7cb",
  },
];

const Card = ({}) => {
  const [active, setActive] = useState("");
  const [mouseOver, setMouseOver] = useState(false);
  const activeItem = data.find((obj) => obj.name === active);
  return (
    <MainCard>
      <p
        style={{ color: "#A9B2BC", textAlign: "center", paddingBottom: "1rem" }}
      >
        Contact State
      </p>
      <ChartWrapper>
        <ChartLabel isVisible={mouseOver}>
          {activeItem && activeItem.name}
          <ChartLabelValue>{active !== "" && activeItem.value}</ChartLabelValue>
        </ChartLabel>
        <PieChart width={170} height={170}>
          <Pie
            isAnimationActive={false}
            dataKey="value"
            startAngle={90}
            endAngle={450}
            strokeWidth={0}
            data={data}
            innerRadius={60}
            outerRadius={80}
            onMouseEnter={(e) => {
              setActive(e.name);
              setMouseOver(true);
            }}
            onMouseLeave={(e) => {
              setMouseOver(false);
            }}
          />
        </PieChart>
      </ChartWrapper>
    </MainCard>
  );
};

export default Card;
