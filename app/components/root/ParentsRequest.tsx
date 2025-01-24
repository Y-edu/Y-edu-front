"use client";

import { useEffect } from "react";
import { useGetParentsRequest } from "../../hooks/query/useGetParentsRequest";
import Accordion from "../../ui/Accordion";

function ParentsRequest() {
  const { data, error } = useGetParentsRequest("abc123");
  useEffect(() => {
    console.log(data);
  }, [data]);

  return <Accordion visibleContent={<div></div>} hiddenContent={<div></div>} />;
}

export default ParentsRequest;
