import { LoginForm } from "@/components/auth/login-form";
import { LoginHero } from "@/components/auth/login-hero";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col items-center justify-center px-4 sm:w-1/2 lg:px-8">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">
              POS<span className="text-blue-600">ify</span>AI.
            </h1>
          </div>
          <LoginForm />
        </div>
      </div>
      <LoginHero />
    </div>
  );
}

// import { LoginForm } from "@/components/auth/login-form"
// import { LoginHero } from "@/components/auth/login-hero"

// export default function LoginPage() {
//   return (
//     <div className="flex min-h-screen">
//       <div className="flex w-full flex-col items-center justify-center px-4 sm:w-1/2 lg:px-8">
//         <div className="w-full max-w-sm">
//           <div className="mb-8">
//             <h1 className="text-2xl font-bold">
//               POS<span className="text-blue-600">ify</span>AI.
//             </h1>
//           </div>
//           <LoginForm />
//         </div>
//       </div>
//       <LoginHero />
//     </div>
//   )
// }

