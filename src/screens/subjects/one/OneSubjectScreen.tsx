import React from "react";
import { useParams } from "react-router";

const OneSubjectScreen = () => {
  const { subjectId } = useParams();
  return <div>This is 0ne subject {subjectId}</div>;
};

export default OneSubjectScreen;
