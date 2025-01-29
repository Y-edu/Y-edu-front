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
  getPaginationRowModel,
} from "@tanstack/react-table";
import type { Table } from "@tanstack/react-table";

import { AlimTHeaderColumn } from "../(constants)/AlimColumn";
import { useGetAcceptance } from "../../../../../hooks/query";
import { AcceptanceSchema } from "../../../../../actions/get-acceptance";

interface AlimTableContextType {
  alimTable: Table<AcceptanceSchema["data"]["0"]>;
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

  const alimData = useMemo<AcceptanceSchema["data"]>(() => {
    return (
      data?.data?.map((v) => {
        return {
          ...v,
          receiveAccetance: Math.floor(
            v.allReceiveAccetance === 0
              ? 0
              : (v.receiveAcceptance / v.allReceiveAccetance) * 100,
          ),
        };
      }) || []
    );
  }, [data]);

  const alimTable = useReactTable({
    columns: AlimTHeaderColumn,
    data: alimData,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    getRowId: (serverStateData) => String(serverStateData.id),
    enableRowSelection: true,
    enableExpanding: true,
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <AlimTableContext.Provider
      value={{ alimTable, rowSelection, setRowSelection }}
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
