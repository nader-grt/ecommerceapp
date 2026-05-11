import { useState } from "react";
import { useDataProvider, useNotify, useRefresh } from "react-admin";


export const TransferDialog = ({ record, onClose }: any) => {
    const [qty, setQty] = useState(0);
    const [warehouseId, setWarehouseId] = useState("");
  
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const refresh = useRefresh();
  
    const handleSubmit = async () => {
      try {
        await dataProvider.create("inventories/transfer", {
          data: {
            sourceInventoryId: record.id,
            targetWarehouseId: Number(warehouseId),
            quantity: Number(qty),
          },
        });
  
        notify("Transferred");
        refresh();
        onClose();
      } catch (e: any) {
        notify(e.message, { type: "error" });
      }
    };
  
    return (
      <div className="modal">
        <h3>Transfer</h3>
  
        <input
          placeholder="Warehouse ID"
          onChange={(e) => setWarehouseId(e.target.value)}
        />
  
        <input
          type="number"
          onChange={(e) => setQty(+e.target.value)}
        />
  
        <button onClick={handleSubmit}>Confirm</button>
      </div>
    );
  };