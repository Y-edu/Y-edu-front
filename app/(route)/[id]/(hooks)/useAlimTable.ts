"use client";

import {
  RowSelectionState,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";

import { AlimTHeaderColumn } from "../(constants)/AlimColumn";
import { useGetAcceptance } from "../../../hooks/query";

interface UseAlimTableProps {
  matchingId: number;
  page: number;
}

export function useAlimTable({ matchingId, page }: UseAlimTableProps) {
  const { data } = useGetAcceptance(matchingId, page);

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const alimData = useMemo(() => {
    return (
      data?.data?.map((v) => {
        return {
          ...v,
          receiveAccetance: Math.floor(
            (v.receiveAccetance / v.allReceiveAccetance) * 100,
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
  });

  return { alimTable };
}
