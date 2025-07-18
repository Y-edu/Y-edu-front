"use client";

import { useEffect, useState } from "react";

import ClassList from "@/components/admin/ClassList";
import { SearchBar } from "@/ui";
import { Class, useGetClassList } from "@/hooks/query/useGetClassList";
import { CLASS_STATUS_OPTIONS } from "@/constants/matching";

export default function ClassManagementHome() {
  const { data } = useGetClassList({
    matchingStatus: [...CLASS_STATUS_OPTIONS],
  });

  const [allData, setAllData] = useState<Class[]>([]);
  const [filteredData, setFilteredData] = useState<Class[]>([]);

  useEffect(() => {
    if (data?.applicationFormByMatchingId) {
      setAllData(data.applicationFormByMatchingId);
      setFilteredData(data.applicationFormByMatchingId);
    }
  }, [data]);

  const handleSearch = (term: string) => {
    if (!term.trim()) {
      setFilteredData(allData);
      return;
    }

    const filtered = allData.filter((item) => {
      // 공백 제거 및 소문자화
      const refineText = (text: string | null | undefined) => {
        if (!text) return "";
        return text.replace(/\s+/g, "").toLowerCase();
      };

      const searchRefined = refineText(term);

      return (
        refineText(item.subject).includes(searchRefined) ||
        refineText(item.parent?.kakaoName).includes(searchRefined) ||
        refineText(item.teacher?.nickName).includes(searchRefined) ||
        refineText(String(item.matchingId)).includes(searchRefined) ||
        refineText(item.applicationFormId).includes(searchRefined)
      );
    });

    setFilteredData(filtered);
  };

  return (
    <div>
      <div className="p-4 pt-2">
        <SearchBar
          onSearch={handleSearch}
          placeholder="수업코드, 카톡 이름, 과목, 선생님 닉네임으로 검색하세요"
        />
        <ClassList
          classItems={filteredData}
          setClassItems={setFilteredData}
          pagination
        />
      </div>
    </div>
  );
}
