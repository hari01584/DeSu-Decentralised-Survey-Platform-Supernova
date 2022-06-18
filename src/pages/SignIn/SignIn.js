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

import { startAuthflow } from "../../integration/auth/ii";
// import { AuthClient } from "@dfinity/auth-client";

export default function SignIn({ history }) {
  const { setUser, user } = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const login = async (email, password) => {
    console.log("Hows it going");

    let r = await startAuthflow(); // Start login
    console.log(r);
    console.log("Are we hrere");

    // try {
    //   const response = await axiosInstance.post("/users/auth", {
    //     email,
    //     password
    //   });

    //   axiosInstance.defaults.headers.common = {
    //     Authorization: `Bearer ${response.data.token}`
    //   };

    //   const userData = {
    //     ...user,
    //     isLoggedIn: true,
    //     data: response.data.user,
    //     token: response.data.token
    //   };

    //   setUser(userData);

    //   localStorage.setItem("user", JSON.stringify(userData));

    //   history.push(URL_ROOT);
    // } catch ({ response }) {
    //   setError(response?.data?.message || "Unexpected error");
    // }
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
          <SizedBox height="20px" />
          <Button onClick={() => history.push(URL_REGISTER)} color="purple">
            Create Account
          </Button>
        </Buttons>
      </Card>
    </Container>
  );
}
