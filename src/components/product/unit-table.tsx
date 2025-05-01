import { useEffect, useState } from "react";
import { FileEdit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Product {
  id: string;
  name: string;
  status: string;
}

export function UnitTable() {
  const [units, setUnits] = useState<Product[]>([]);

  // Fetch the units data from the backend
  useEffect(() => {
    const fetchUnits = async () => {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setUnits(data[0]?.products || []);  // Assuming you always get one object with 'products' array
    };

    fetchUnits();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-900">Manage Unit</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SL.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {units.map((unit) => (
              <TableRow key={unit.id}>
                <TableCell>{unit.id}</TableCell>
                <TableCell>{unit.name}</TableCell>
                <TableCell>{unit.status}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost">
                      <FileEdit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// import { FileEdit, Trash2 } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// const units = [
//   {
//     id: "1",
//     name: "Price",
//     status: "Active",
//   },
//   {
//     id: "2",
//     name: "Qnty",
//     status: "Active",
//   },
// ]

// export function UnitTable() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="text-blue-900">Manage Unit</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>SL.</TableHead>
//               <TableHead>Name</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Action</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {units.map((unit) => (
//               <TableRow key={unit.id}>
//                 <TableCell>{unit.id}</TableCell>
//                 <TableCell>{unit.name}</TableCell>
//                 <TableCell>{unit.status}</TableCell>
//                 <TableCell>
//                   <div className="flex gap-1">
//                     <Button size="icon" variant="ghost">
//                       <FileEdit className="h-4 w-4" />
//                     </Button>
//                     <Button size="icon" variant="ghost">
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   )
// }


