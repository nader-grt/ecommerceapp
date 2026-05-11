import { useState } from "react";
import { useNotify, useRefresh } from "react-admin";
import { httpclientService } from "../../../auth/httpclientService/httpclientService";


export const AddStockDialog = ({ record, onClose }: any) => {
  const [qty, setQty] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const notify = useNotify();
  const refresh = useRefresh();

  const handleSubmit = async () => {
    // =========================
    //  VALIDATION
    // =========================
    if (!qty || qty <= 0) {
      notify("Quantity must be greater than 0", { type: "warning" });
      return;
    }

    try {
      setLoading(true);

      const { json } = await httpclientService(
        "http://localhost:4000/api/inventories/add-stock",
        {
          method: "POST",
          body: JSON.stringify({
            variantId: record.variant?.id,
            warehouseId: record.warehouse?.id,
            quantity: qty,
          }),
        }
      );

      // =========================
      // SUCCESS
      // =========================
      notify(json?.message || "Stock added successfully", {
        type: "success",
      });

      refresh();
      onClose();
    } catch (e: any) {
      notify(e.message || "Error while adding stock", {
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <h3>Add Stock</h3>

      {/* INFO (important for business UX) */}
      <p>
        <strong>Product:</strong> {record?.variant?.product?.name}
      </p>
      <p>
        <strong>SKU:</strong> {record?.variant?.sku}
      </p>
      <p>
        <strong>Warehouse:</strong> {record?.warehouse?.name}
      </p>

      {/* INPUT */}
      <input
        type="number"
        min={1}
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        placeholder="Enter quantity"
      />

      {/* ACTIONS */}
      <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing..." : "Confirm"}
        </button>

        <button onClick={onClose} disabled={loading}>
          Cancel
        </button>
      </div>
    </div>
  );
};