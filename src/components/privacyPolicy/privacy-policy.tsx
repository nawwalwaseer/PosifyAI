import { X } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

interface PrivacyPolicyProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PrivacyPolicy({ open, onOpenChange }: PrivacyPolicyProps) {
  const [agreed, setAgreed] = useState(false)

  return (
    
    <Dialog  open={open} onOpenChange={onOpenChange} >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl font-bold">
            <span className="text-black">POSify</span>
            <span className="text-blue-600">AI.</span>
            <span className="ml-2 text-base font-normal text-muted-foreground">Purchase Conditions Privacy Policy</span>
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-full hover:bg-slate-100"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">1. Agreement:</h3>
              <p className="text-sm text-muted-foreground">
                Purchasing the AI-Enhanced POS System confirms acceptance of the terms.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">2. Payment:</h3>
              <p className="text-sm text-muted-foreground">Secure payment required for service purchase.</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">3. Delivery:</h3>
              <p className="text-sm text-muted-foreground">Service provided post-payment with specified timelines.</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">4. Security & Data:</h3>
              <ul className="ml-6 list-disc text-sm text-muted-foreground">
                <li>Data Collection: Gathers user details, transaction data, and usage info.</li>
                <li>Usage: Data utilized for service improvement, transactions, and analytics.</li>
                <li>Security: Data protected with encryption and security measures.</li>
                <li>Sharing: Shared only with service providers for legal compliance.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">5. Refunds:</h3>
              <p className="text-sm text-muted-foreground">Available for unresolved technical issues within 30 days.</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">6. User Rights:</h3>
              <p className="text-sm text-muted-foreground">
                Users can access, update, or delete data and opt-out of communications.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
            <label htmlFor="agreement" className="text-sm font-medium">
              I have read and agree to the terms
            </label>
            <Switch
              id="agreement"
              checked={agreed}
              onCheckedChange={setAgreed}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>

          <div className="flex justify-end">
            <Link to='/signup'>
            <Button className="bg-blue-600 hover:bg-blue-700" disabled={!agreed} onClick={() => onOpenChange(false)}>
              Continue
            </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    
  )
}


// import { X } from "lucide-react"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Switch } from "@/components/ui/switch"

// interface PrivacyPolicyProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
// }

// export function PrivacyPolicy({ open, onOpenChange }: PrivacyPolicyProps) {
//   const [agreed, setAgreed] = useState(false)

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-2xl">
//         <DialogHeader>
//           <DialogTitle className="flex items-center text-xl font-bold">
//             <span className="text-black">POSify</span>
//             <span className="text-blue-600">AI.</span>
//             <span className="ml-2 text-base font-normal text-muted-foreground">Purchase Conditions Privacy Policy</span>
//           </DialogTitle>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="absolute right-4 top-4 rounded-full hover:bg-slate-100"
//             onClick={() => onOpenChange(false)}
//           >
//             <X className="h-4 w-4" />
//           </Button>
//         </DialogHeader>

//         <div className="space-y-6 py-4">
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <h3 className="text-sm font-semibold">1. Agreement:</h3>
//               <p className="text-sm text-muted-foreground">
//                 Purchasing the AI-Enhanced POS System confirms acceptance of the terms.
//               </p>
//             </div>

//             <div className="space-y-2">
//               <h3 className="text-sm font-semibold">2. Payment:</h3>
//               <p className="text-sm text-muted-foreground">Secure payment required for service purchase.</p>
//             </div>

//             <div className="space-y-2">
//               <h3 className="text-sm font-semibold">3. Delivery:</h3>
//               <p className="text-sm text-muted-foreground">Service provided post-payment with specified timelines.</p>
//             </div>

//             <div className="space-y-2">
//               <h3 className="text-sm font-semibold">4. Security & Data:</h3>
//               <ul className="ml-6 list-disc text-sm text-muted-foreground">
//                 <li>Data Collection: Gathers user details, transaction data, and usage info.</li>
//                 <li>Usage: Data utilized for service improvement, transactions, and analytics.</li>
//                 <li>Security: Data protected with encryption and security measures.</li>
//                 <li>Sharing: Shared only with service providers for legal compliance.</li>
//               </ul>
//             </div>

//             <div className="space-y-2">
//               <h3 className="text-sm font-semibold">5. Refunds:</h3>
//               <p className="text-sm text-muted-foreground">Available for unresolved technical issues within 30 days.</p>
//             </div>

//             <div className="space-y-2">
//               <h3 className="text-sm font-semibold">6. User Rights:</h3>
//               <p className="text-sm text-muted-foreground">
//                 Users can access, update, or delete data and opt-out of communications.
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
//             <label htmlFor="agreement" className="text-sm font-medium">
//               I have read and agree to the terms
//             </label>
//             <Switch
//               id="agreement"
//               checked={agreed}
//               onCheckedChange={setAgreed}
//               className="data-[state=checked]:bg-blue-600"
//             />
//           </div>

//           <div className="flex justify-end">
//             <Button className="bg-blue-600 hover:bg-blue-700" disabled={!agreed} onClick={() => onOpenChange(false)}>
//               Continue
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

