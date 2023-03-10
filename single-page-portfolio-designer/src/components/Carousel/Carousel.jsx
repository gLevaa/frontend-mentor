import React from "react";
import styled from "styled-components";

import ArrowButton from "../ArrowButton";

import { QUERIES } from "../../constants";

function Carousel({ children }) {
  /* visibleIndexStart <-> (visibleIndexStart + 3) */
  const [visibleIndexStart, setVisibleIndexStart] = React.useState(0);

  React.useEffect(() => {
    const handleKeyDown = (ev) => {
      if (ev.keyCode === 37) {
        // arrow left
        handleLeftShift();
      } else if (ev.keyCode === 39) {
        // arrow right
        handleRightShift();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLeftShift = () => {
    setVisibleIndexStart(
      (previous) => (previous + (children.length - 1)) % children.length
    );
  };

  const handleRightShift = () => {
    setVisibleIndexStart((previous) => (previous + 1) % children.length);
  };

  return (
    <Wrapper>
      <ItemsWrapper role="listbox">
        {[...Array(3).keys()].map(
          (shift) => children[(visibleIndexStart + shift) % children.length]
        )}
      </ItemsWrapper>
      <ButtonsWrapper>
        <ArrowButton
          variant="left"
          onClick={handleLeftShift}
          title="previous"
        />
        <ArrowButton variant="right" onClick={handleRightShift} title="next" />
      </ButtonsWrapper>
    </Wrapper>
  );
}

Carousel.Item = ({ src }) => {
  return (
    <ItemWrapper>
      <Item src={src} />
    </ItemWrapper>
  );
};

/* inherits --inner-spacing from <WorkDisplay /> */
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--inner-spacing);
  margin-top: var(--inner-spacing);
`;

const ItemsWrapper = styled.ul`
  position: relative;
  width: var(--image-width);
  height: 360px;
  --image-width: 540px;

  & :nth-child(1) {
    left: calc(-1 * var(--image-width) - 30px);
  }

  & :nth-child(3) {
    right: calc(-1 * var(--image-width) - 30px);
  }

  @media ${QUERIES.mobileAndBelow} {
    height: 180px;
    --image-width: 270px;
  }
`;

const ItemWrapper = styled.li`
  position: absolute;
  /* border radius on image corner overflow */
  overflow: hidden;
  width: 100%;
  border-radius: 10px;
`;

const Item = styled.img`
  display: block;
  width: 100%;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export default Carousel;
