import React, { useEffect, useState } from "react";
import Kuppi from "../../../models/Kuppi";
import KuppiService from "../../../services/KuppiService";

const kuppiService = new KuppiService();
const KuppiSection = () => {
  const add = () => {
    // kuppiService.create({});
  };
  const [kuppiList, setKuppiList] = useState<Kuppi[]>();

  useEffect(() => {
    kuppiService.stream((data)=> setKuppiList(data));
  }, []);

  return <div></div>;
};

export default KuppiSection;
