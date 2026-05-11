import { useState } from "react";
import { useRecordContext } from "react-admin";
import { AddStockDialog } from "./AddStockDialog";
import { ReserveDialog } from "./ReserveDialog";
import { SellDialog } from "./SellDialog";
import { TransferDialog } from "./TransferDialog";

export const ActionsField = () => {
  const record = useRecordContext<any>();
  const [action, setAction] = useState<string | null>(null);

  if (!record) return null;

  return (
    <>
      <div style={{ display: "flex", gap: 6 }}>
        <button onClick={() => setAction("add")}>➕</button>
        <button onClick={() => setAction("reserve")}>🔒</button>
        <button onClick={() => setAction("sell")}>💰</button>
        <button onClick={() => setAction("transfer")}>🔁</button>
      </div>

      {action === "add" && <AddStockDialog record={record} onClose={() => setAction(null)} />}
      {action === "reserve" && <ReserveDialog record={record} onClose={() => setAction(null)} />}
      {action === "sell" && <SellDialog record={record} onClose={() => setAction(null)} />}
      {action === "transfer" && <TransferDialog record={record} onClose={() => setAction(null)} />}
    </>
  );
};