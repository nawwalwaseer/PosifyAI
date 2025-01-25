import { Button } from "@/components/ui/button"

export function SalesHeader() {
  return (
    <div className="flex items-center justify-between ">
      <h2 className="text-lg font-semibold text-blue-900">Today&apos;s Sales</h2>
      <div className="flex gap-2">
        <Button className="w-[100px]  px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-full transform hover:scale-110 transition-all duration-300  ">New Sale</Button>
        <Button variant="outline" className="rounded-full transform hover:scale-110 transition-all duration-300 ">POS Sale</Button>
      </div>
    </div>
  )
}

