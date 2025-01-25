import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import * as z from "zod";
import { Apple, Chrome, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define schema using Zod
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Define the Google user type inside the same file
interface GoogleUser {
  getBasicProfile(): {
    getName(): string;
    getEmail(): string;
    getImageUrl(): string;
  };
}

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [googleUser, setGoogleUser] = useState<any>(null); // Store Google user data after login

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      console.log(values); // Simulated login
      setIsLoading(false);
    }, 2000); // Mock API delay
  }

  // Google Sign-In functionality
  const handleGoogleSignIn = () => {
    window.gapi.auth2.getAuthInstance().signIn().then(
      (googleUser: GoogleUser) => {
        const profile = googleUser.getBasicProfile();
        console.log("Google user:", profile);
        setGoogleUser({
          name: profile.getName(),
          email: profile.getEmail(),
          imageUrl: profile.getImageUrl(),
        });
      },
      (error: any) => {
        console.error("Google sign-in error:", error);
      }
    );
  };

  // Load Google API script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    script.onload = () => {
      window.gapi.load("auth2", () => {
        window.gapi.auth2.init({
          client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace with your actual Google Client ID
        });
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Login Account</h2>
        <p className="text-sm text-muted-foreground">Welcome back, login to continue.</p>
      </div>

      <div className="space-y-4">
        {/* Continue with Google Button */}
        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={handleGoogleSignIn} // Google sign-in action
        >
          <Chrome className="mr-2 h-4 w-4" />
          {googleUser ? `Logged in as ${googleUser.name}` : "Continue with Google"}
        </Button>

        {/* Continue with Apple Button */}
        <Button variant="outline" className="w-full" type="button">
          <Apple className="mr-2 h-4 w-4" />
          Continue with Apple
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email address"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      form.trigger("email"); // Trigger validation on change
                    }}
                  />
                </FormControl>
                <FormMessage>{form.formState.errors.email?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Password Field with Toggle */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                    />
                    <span
                      className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </span>
                  </div>
                </FormControl>
                <FormMessage>{form.formState.errors.password?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Login Button with Loading State */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login Account"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}



// import { zodResolver } from "@hookform/resolvers/zod"
// import { Link } from "react-router-dom"
// import { useForm } from "react-hook-form"
// import * as z from "zod"
// import { Apple, Chrome } from 'lucide-react'

// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// // import { Separator } from "@/components/ui/separator"

// const formSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(8, "Password must be at least 8 characters"),
// })

// export function LoginForm() {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   })

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log(values)
//   }

//   return (
//     <div className="space-y-6">
//       <div className="space-y-2 text-center">
//         <h2 className="text-2xl font-semibold tracking-tight">Login Account</h2>
//         <p className="text-sm text-muted-foreground">Welcome back, login to continue.</p>
//       </div>

//       <div className="space-y-4">
//         <Button variant="outline" className="w-full" type="button">
//           <Chrome className="mr-2 h-4 w-4" />
//           Continue with Google
//         </Button>
//         <Button variant="outline" className="w-full" type="button">
//           <Apple className="mr-2 h-4 w-4" />
//           Continue with Apple
//         </Button>
//       </div>

//       <div className="relative">
//         <div className="absolute inset-0 flex items-center">
//           <span className="w-full border-t" />
//         </div>
//         <div className="relative flex justify-center text-xs uppercase">
//           <span className="bg-background px-2 text-muted-foreground">Or</span>
//         </div>
//       </div>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter your email address" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <Input type="password" placeholder="Enter your password" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button type="submit" className="w-full">
//             Login Account
//           </Button>
//         </form>
//       </Form>

//       <p className="text-center text-sm text-muted-foreground">
//         Don&apos;t have an account?{" "}
//         <Link to='/signup' className="text-blue-600 hover:underline" >Sign Up</Link>

//       </p>
//     </div>
//   )
// }
