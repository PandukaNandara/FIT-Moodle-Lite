import React, { useEffect } from "react";
import { useAppBarContext } from "../../layouts/main/MainLayout";

const AllSubjectScreen = () => {
  const appBarContext = useAppBarContext();

  useEffect(() => {
    appBarContext.setTitle("All Subjects");
  }, []);

  return (
    <div className="d-padding">
      <div>asdasdas</div>
      <div>asdasdas</div>
    </div>
  );
};

export default AllSubjectScreen;
