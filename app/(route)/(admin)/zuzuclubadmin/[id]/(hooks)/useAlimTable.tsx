"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
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
  alimTable: Table<
    AcceptanceSchema["alarmTalkResponses"][0] & { receiveAcceptance?: string }
  >;
  rowSelection: RowSelectionState;
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
  setAlimData: React.Dispatch<
    React.SetStateAction<
      (AcceptanceSchema["alarmTalkResponses"][0] & {
        receiveAcceptance: string;
      })[]
    >
  >;
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
  const [alimData, setAlimData] = useState<
    (AcceptanceSchema["alarmTalkResponses"][0] & {
      receiveAcceptance: string;
    })[]
  >([]);

  useEffect(() => {
    if (data?.alarmTalkResponses) {
      setAlimData(
        data.alarmTalkResponses.map((v) => ({
          ...v,
          receiveAcceptance: `${v.accept} / ${v.total}`,
        })),
      );
    }
  }, [data]);

  const statusOrder = {
    전송: 1,
    수락: 2,
    대기: 3,
    거절: 4,
    매칭: 0,
  };

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
      value={{ alimTable, rowSelection, setRowSelection, setAlimData }}
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
