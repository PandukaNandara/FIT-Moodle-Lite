import React from "react";
import { useParams } from "react-router";
import OneSubjectLanding from "./OneSubjectLanding";

const OneSubjectScreen = () => {
  const { subjectId } = useParams();
  // return <div>This is 0ne subject {subjectId}</div>;
  return (
    <OneSubjectLanding />
  );
};

export default OneSubjectScreen;
