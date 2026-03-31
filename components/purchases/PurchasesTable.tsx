"use client"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useState } from "react"
import { GuideDetailsModal } from "./GuideDetailsModal"

interface Guide {
  id: string
  title: string
  category: {
    title: string
  }
  price: number
  createdAt: string
}

interface PurchasesTableProps {
  guides: Guide[]
}

export function PurchasesTable({ guides }: PurchasesTableProps) {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null)
  const [open, setOpen] = useState(false)

  const handleView = (guide: Guide) => {
    setSelectedGuide(guide)
    setOpen(true)
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guides.map((guide) => (
              <TableRow key={guide.id}>
                <TableCell>{guide?.title}</TableCell>
                <TableCell>{guide?.title}</TableCell>
                <TableCell>${guide?.price}</TableCell>
                <TableCell>
                  {new Date(guide?.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleView(guide)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto">
          {selectedGuide && <GuideDetailsModal guide={selectedGuide} />}
        </DialogContent>
      </Dialog>
    </>
  )
}
