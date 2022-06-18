import React, { useContext, useState } from "react";
import { Container, Title, Buttons, Card, ErrorMessage } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import SizedBox from "../../components/SizedBox";
import VectorContainer from "../../components/VectorContainer";
import signin_vector from "../../assets/img/flame-sign-up.png";
import AuthContext from "../../contexts/auth";
import axiosInstance from "../../services/api";
import { URL_ROOT, URL_REGISTER } from "../../utils/constants";

import { startAuthflow, getAuthenticatedDeSu } from "../../integration/auth/ii";
import { demoToUser } from "../../integration/auth/demographic";
// import { AuthClient } from "@dfinity/auth-client";

export default function SignIn({ history }) {
  const { setUser, user } = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const login = async (email, password) => {
    let actor = getAuthenticatedDeSu();
    if(!actor){
      let r = await startAuthflow();
      actor = getAuthenticatedDeSu();
    }

    console.log(await actor.whoami());

    console.log("data get");
    console.log(actor);

    // let create = await actor.createDemographicRecord({age: 17, country: "INDIA", name: "Idk"});
    // console.log(create);

    let userdemographic = await actor.fetchDemographicRecord();
    if(userdemographic.length == 0){
      // ie no demographic record, register user now
      const name = prompt('Please enter your name');
      const age = parseInt(prompt('Please enter your age'));
      const country = prompt('Please enter your country');
      let create = await actor.createDemographicRecord({age: age, country: country, name: name});
      console.log(create);
    }

    userdemographic = await actor.fetchDemographicRecord();
    console.log(userdemographic);

    let res = userdemographic[0];

    let user = demoToUser(res);

    const userData = {
      ...user,
      isLoggedIn: true,
      data: user,
      // token: response.data.token
    };

    console.log(userData);

    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));

    history.push(URL_ROOT);
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      login(email, password);
    }
  };

  return (
    <Container>
      <VectorContainer src={signin_vector}></VectorContainer>
      <Title>Sign In</Title>
      <Card>
        <ErrorMessage>{error}</ErrorMessage>
        <SizedBox height="20px" />
        <Buttons>
          <Button onClick={() => login(email, password)}>Sign In</Button>
          {/* <SizedBox height="20px" />
          <Button onClick={() => history.push(URL_REGISTER)} color="purple">
            Create Account
          </Button> */}
        </Buttons>
      </Card>
    </Container>
  );
}
