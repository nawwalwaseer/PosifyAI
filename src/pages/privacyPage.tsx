import { useState, useEffect } from "react"
import { PrivacyPolicy } from "@/components/privacyPolicy/privacy-policy"

export default function ExamplePage() {
  const [showPolicy, setShowPolicy] = useState(false)

  // Automatically show the Privacy Policy when the page loads
  useEffect(() => {
    setShowPolicy(true)
  }, [])

  return (
    <>
    <div className="flex min-h-screen items-center justify-center">
      {/* The Privacy Policy will automatically show */}
      <PrivacyPolicy open={showPolicy} onOpenChange={setShowPolicy} />
    </div>

    
    </>
  )
}


// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { PrivacyPolicy } from "@/components/privacyPolicy/privacy-policy"

// export default function ExamplePage() {
//   const [showPolicy, setShowPolicy] = useState(false)

//   return (
//     <div className="flex min-h-screen items-center justify-center">
//       <Button onClick={() => setShowPolicy(true)}>Show Privacy Policy</Button>
//       <PrivacyPolicy open={showPolicy} onOpenChange={setShowPolicy} />
//     </div>
//   )
// }

