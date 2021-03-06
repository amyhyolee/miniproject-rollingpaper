import React, { useState } from "react";
import styled from "styled-components";
import { LoginForm } from "./loginForm";
import { motion } from "framer-motion";
import { AccountContext } from "./accountContext";
import { SignupForm } from "./signupForm";
import Wave from "react-wavify"
import './index.css';

const BoxContainer = styled.div`
  width: 400px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

// 회원가입, 로그인 클릭하면 내려오는 동그라미
const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: -400px;
  left: -70px;
  background: rgb(86,196,234);
  z-index: 8;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-family: "HSYuji-Regular";
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.h5`
  font-family: "HSYuji-Regular";
  color: #581845;
  font-weight: 500;
  font-size: 20px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
  z-index: 7;
`;

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1300px",
    borderRadius: "20%",
    transform: "rotate(60deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

export function AccountBox(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };

  const contextValue = { switchToSignup, switchToSignin };

//   const WaveContainer = styled.div`
//   position: fixed;
//   left: 0;
//   right: 0;
//   top: -5px;
//   height: ${(props) => props.level + 'vh'};
//   display: flex;
//   z-index: -1;
//   transform: rotate(180deg);
// `;

  return (
    <AccountContext.Provider value={contextValue}>
      <BoxContainer>
      {/* <WaveContainer level={90}> */}
        <Wave 
        className="wave"
        fill='#56C4EA'
        paused={false}
        option={{
          height: 20,
          amplitude: 45,
          speed: 0.1,
          points: 5
        }}
        
        />
        {/* </WaveContainer> */}
        <TopContainer>
          <BackDrop
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={backdropVariants}
            transition={expandingTransition}
          />
          {active === "signin" && (
            <HeaderContainer>
              <HeaderText>롤링 페이퍼를</HeaderText>
              <HeaderText>나누어요!</HeaderText>
              <SmallText>계속 하려면 로그인을 해주세요!!</SmallText>
            </HeaderContainer>
          )}
          {active === "signup" && (
            <HeaderContainer>
              <HeaderText>계정</HeaderText>
              <HeaderText>만들기</HeaderText>
              <SmallText>계속 하려면 로그인을 해주세요!</SmallText>
            </HeaderContainer>
          )}
        </TopContainer>
        <InnerContainer>
          {active === "signin" && <LoginForm />}
          {active === "signup" && <SignupForm />}
        </InnerContainer>
      </BoxContainer>
    </AccountContext.Provider>
  );
}
