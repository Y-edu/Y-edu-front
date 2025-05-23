"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  PropsWithChildren,
} from "react";
import {
  RowSelectionState,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import type { Table } from "@tanstack/react-table";

import { AlimTHeaderColumn } from "@/components/admin/AlimColumn";
import { useGetAcceptance } from "@/hooks/query";
import { AcceptanceSchema } from "@/actions/get-acceptance";

interface AlimTableContextType {
  matchingId: string;
  alimTable: Table<AcceptanceSchema["alarmTalkResponses"][0]>;
  rowSelection: RowSelectionState;
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
}

const AlimTableContext = createContext<AlimTableContextType | undefined>(
  undefined,
);

export const AlimTableProvider = ({
  matchingId,
  page,
  children,
}: PropsWithChildren<{ matchingId: string; page: number }>) => {
  const { data } = useGetAcceptance(matchingId, page);

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const statusOrder = {
    최종매칭: 0,
    매칭: 1,
    입금단계: 2,
    전송: 3,
    수락: 4,
    대기: 5,
    거절: 6,
    과외결렬: 7,
  };

  const alimData = useMemo<
    (AcceptanceSchema["alarmTalkResponses"][0] & {
      receiveAcceptance: string;
    })[]
  >(() => {
    return (
      data?.alarmTalkResponses?.map((v) => {
        return {
          ...v,
          receiveAcceptance: `${v.accept} / ${v.total}`,
        };
      }) || []
    );
  }, [data]);

  const alimTable = useReactTable({
    columns: AlimTHeaderColumn,
    data: alimData.sort((a, b) => {
      return (statusOrder[a.status] || 0) - (statusOrder[b.status] || 0);
    }),
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    getRowId: (serverStateData) => String(serverStateData.classMatchingId),
    enableRowSelection: true,
    enableExpanding: true,
  });

  return (
    <AlimTableContext.Provider
      value={{ matchingId, alimTable, rowSelection, setRowSelection }}
    >
      {children}
    </AlimTableContext.Provider>
  );
};

export const useAlimTableContext = () => {
  const context = useContext(AlimTableContext);
  if (!context) {
    throw new Error("useAlimTableContext는 AlimProvider가 필요합니다");
  }
  return {
    ...context,
  };
};
