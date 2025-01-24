"use client";

import { useGetParentsRequest } from "../../hooks/query/useGetParentsRequest";
import Accordion from "../../ui/Accordion";

function ParentsRequest() {
  const { data } = useGetParentsRequest("id");

  return <Accordion visibleContent={<div></div>} hiddenContent={<div></div>} />;
}

export default ParentsRequest;
