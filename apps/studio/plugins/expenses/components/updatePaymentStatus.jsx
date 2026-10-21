import * as React from "react";
import { Select } from "@sanity/ui";
import { useClient } from "sanity";

export default ({ invoiceId, paymentStatus }) => {
  const [newStatus, setNewStatus] = React.useState(paymentStatus);
  const client = useClient({ apiVersion: "2021-03-25" });

  async function update(val) {
    setNewStatus(val);
    await client.patch(invoiceId).set({ payment_status: val }).commit();
  }

  return (
    <Select
      id="paymentStatus"
      select
      value={newStatus}
      onChange={(e) => update(e.target.value)}
      disabled={newStatus === "paid"}
      color="primary"
      className={newStatus === "paid" ? "disabled" : ""}
    >
      <option value="unpaid">Unpaid</option>
      <option value="paid">Paid</option>
      <option value="partially">Partial</option>
    </Select>
  );
};
