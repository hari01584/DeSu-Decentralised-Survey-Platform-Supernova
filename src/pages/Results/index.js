import React, { useState, useEffect } from "react";

import { Container, Title, Description, Card, Question } from "./styles";
import axiosInstance from "../../services/api";

import Header from "../../components/Header";

import AnswerItem from "../../components/AnswerItem";
import { startAuthflow, getNormalDeSu } from "../../integration/auth/ii";
import { demoToUser } from "../../integration/auth/demographic";

export default function Survey({ history, match }) {
  const [data, setData] = useState();
  const mount = data =>
    data?.questions?.map(question => {
      const total = question.result.reduce((acc, cur) => cur + acc, 0);

      return (
        <Card key={question.id}>
          <Question>{"Question: " + question.title}</Question>
          {question?.options?.map((option, i) => (
            <AnswerItem
              key={i}
              questionId={question.id}
              answerId={option}
              text={option}
              showResults
              resultPercent={total ? question.result[i] / total : 0}
            />
          ))}
        </Card>
      );
    });

  useEffect(() => {
    getNormalDeSu().then((actor)=>{
      actor.fetchAnswerResult(match.params.id).then((data)=>{
        let surveyData = data[0];
        let answerstore = data[1];
        let userdemo = data[2];

        console.log(answerstore);
        let res = {
          id: surveyData.id,
          status: surveyData.closed ? "CLOSED" : "ACTIVE",
          ...surveyData.data,
          createdBy: demoToUser(userdemo[0])
        };
        res.questions.forEach(function (item, index) {
          res.questions[index].result = [0, 0, 0, 0, 0];
        });        
        
        console.log("Start compiling answers");

        // Compile answers to results
        for(let i in answerstore[0]){
          console.log(i);
          let submission = answerstore[i];
          if(!submission) continue;
          for(let eindex in submission){
            let ans = submission[eindex];
            for(let qindex in ans.answers){
              let answerentry = ans.answers[qindex];
              console.log(answerentry);
              let qOptions = res.questions[qindex].options;
              let indx = qOptions.indexOf(answerentry.answer);
              res.questions[qindex].result[indx]++;
            }
          }
        }
        console.log(res);
        setData(res);
      });  
    });
    // axiosInstance
    //   .get(`/surveys/${match.params.id}/result`)
    //   .then(response => {
    //     setData(response?.data);
    //   })
    //   .catch();
  }, [match.params.id]);

  return (
    <Container>
      <Header />
      {data && (
        <>
          <Title>{data.title}</Title>
          <Description>{data.description}</Description>
          {mount(data)}
        </>
      )}
    </Container>
  );
}
