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
import { Pagination } from "@/components/shared/Pagination"

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
  totalPages?: number
  total?: number
  currentPage?: number
  onPageChange?: (page: number) => void
}

export function PurchasesTable({
  guides,
  totalPages = 1,
  total = 0,
  currentPage = 1,
  onPageChange,
}: PurchasesTableProps) {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null)
  const [open, setOpen] = useState(false)

  const handleView = (guide: Guide) => {
    setSelectedGuide(guide)
    setOpen(true)
  }

  if (guides.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="mb-2 text-lg font-medium text-muted-foreground">
          No purchases yet
        </p>
        <p className="text-sm text-muted-foreground">
          Your purchased guides will appear here
        </p>
      </div>
    )
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
                <TableCell>{guide?.category?.title}</TableCell>
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

      {totalPages >= 1 && (
        <div className="flex justify-center pt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange || (() => {})}
          />
        </div>
      )}

      {total > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Showing {(currentPage - 1) * 10 + 1} to{" "}
          {Math.min(currentPage * 10, total)} of {total} purchases
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto">
          {selectedGuide && <GuideDetailsModal guide={selectedGuide} />}
        </DialogContent>
      </Dialog>
    </>
  )
}
