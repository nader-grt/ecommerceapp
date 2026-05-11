import { useState } from "react";
import { useDataProvider, useNotify, useRefresh } from "react-admin";

export const ReserveDialog = ({ record, onClose }: any) => {
    const [qty, setQty] = useState(0);
  
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const refresh = useRefresh();
  
    const handleSubmit = async () => {
      try {
        await dataProvider.create("inventories/reserve", {
          data: {
            inventoryId: record.id,
            quantity: Number(qty),
          },
        });
  
        notify("Reserved");
        refresh();
        onClose();
      } catch (e: any) {
        notify(e.message, { type: "error" });
      }
    };
  
    return (
      <div className="modal">
        <h3>Reserve</h3>
        <input type="number" onChange={(e) => setQty(+e.target.value)} />
        <button onClick={handleSubmit}>Confirm</button>
      </div>
    );
  };