import * as R from "ramda";
import * as React from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { notNilOrEmpty } from "../../../utils/Helpers";
import { FiRefreshCw } from "react-icons/fi";
import { FaReceipt } from "react-icons/fa";

import InvoiceTemplate from "./invoiceTemplate.jsx";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/Select";

export default ({ invoice }) => {
  const [invTheme, setInvTheme] = React.useState("");
  const clientNameForFileName = R.toLower(invoice.client.client_name).split(
    " "
  );

  function generateInv(e) {
    setInvTheme(e);
  }

  return notNilOrEmpty(invTheme) ? (
    <div className="flex items-center justify-center">
      <PDFDownloadLink
        document={<InvoiceTemplate theme={invTheme} invoice={invoice} />}
        fileName={`${invoice.invoice_number}-${clientNameForFileName.join(
          "-"
        )}`}
      >
        {({ blob, url, loading, error }) =>
          loading ? "..." : <FaReceipt height={40} />
        }
      </PDFDownloadLink>
      <div style={{ paddingLeft: 10, cursor: "pointer" }}>
        <FiRefreshCw onClick={() => setInvTheme("")} />
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center text-white">
      <Select onValueChange={(value) => generateInv(value)}>
        <SelectTrigger className="w-auto">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent className="text-white">
          <SelectItem className="cursor-pointer" value="dark">
            Dark
          </SelectItem>
          <SelectItem className="cursor-pointer" value="light">
            Light
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
