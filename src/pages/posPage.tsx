import { useState } from "react"
import { SaleInvoice } from "@/components/pos/sale-invoice"

export default function SaleInvoicePage() {
  const [open, setOpen] = useState(true)

  return <SaleInvoice open={open} onOpenChange={setOpen} />
}

