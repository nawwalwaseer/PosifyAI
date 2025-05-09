import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";

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

// Schema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  code: z.string().length(6, "Code must be exactly 6 characters"),
});

export function LoginForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [randomCode, setRandomCode] = useState<string>("");

  // Generate secure code
  useEffect(() => {
    const generateSecureCode = () => {
      const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lower = "abcdefghijklmnopqrstuvwxyz";
      const digits = "0123456789";
      const all = upper + lower + digits;

      const getRandomChar = (str: string) =>
        str.charAt(Math.floor(Math.random() * str.length));

      const result = [
        getRandomChar(upper),
        getRandomChar(lower),
        getRandomChar(digits),
      ];

      for (let i = 0; i < 3; i++) result.push(getRandomChar(all));
      setRandomCode(result.sort(() => Math.random() - 0.5).join(""));
    };

    generateSecureCode();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    if (values.code !== randomCode) {
      alert("Invalid code. Please try again.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: result.user.name,
            email: result.user.email,
            id: result.user._id,
          })
        );
        navigate("/dashboard");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6 bg-white p-6 rounded-2xl shadow-md">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Login Account</h2>
          <p className="text-sm text-muted-foreground">
            Welcome back, login to continue.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
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
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Code Display */}
            <div className="flex justify-center ">
  <div className="bg-muted border border-border px-6 py-4 rounded-2xl shadow-md text-center w-full max-w-xs">
    <p className="text-sm text-muted-foreground mb-1">Verification Code</p>
    <p className="text-2xl font-semibold font-mono tracking-wider  text-blue-600">{randomCode}</p>
  </div>
</div>


            {/* Code Input */}
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the code above"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        form.trigger("code");
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
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
    </div>
  );
}




// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import * as z from "zod";
// import { Apple, Chrome, Eye, EyeOff } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// const formSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(8, "Password must be at least 8 characters"),
// });

// interface GoogleUser {
//   getBasicProfile(): {
//     getName(): string;
//     getEmail(): string;
//     getImageUrl(): string;
//   };
// }

// export function LoginForm() {
//   const navigate = useNavigate();
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [googleUser, setGoogleUser] = useState<any>(null);

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch("http://localhost:5000/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         console.log("Login successful:", result.message);

//         // Save user info including name
//         localStorage.setItem(
//           "user",
//           JSON.stringify({
//             name: result.user.name,     // ⬅️ added name here
//             email: result.user.email,
//             id: result.user._id,
//           })
//         );

//         navigate("/dashboard");
//       } else {
//         console.error("Login failed:", result.message);
//         alert("Invalid credentials. Access is restricted.");
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//       alert("An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleSignIn = () => {
//     window.gapi.auth2.getAuthInstance().signIn().then(
//       (googleUser: GoogleUser) => {
//         const profile = googleUser.getBasicProfile();
//         setGoogleUser({
//           name: profile.getName(),
//           email: profile.getEmail(),
//           imageUrl: profile.getImageUrl(),
//         });
//       },
//       (error: any) => {
//         console.error("Google sign-in error:", error);
//       }
//     );
//   };

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://apis.google.com/js/platform.js";
//     script.async = true;
//     script.onload = () => {
//       window.gapi.load("auth2", () => {
//         window.gapi.auth2.init({
//           client_id: "YOUR_GOOGLE_CLIENT_ID",
//         });
//       });
//     };
//     document.body.appendChild(script);
//   }, []);

//   return (
//     <div className="space-y-6">
//       <div className="space-y-2 text-center">
//         <h2 className="text-2xl font-semibold tracking-tight">Login Account</h2>
//         <p className="text-sm text-muted-foreground">
//           Welcome back, login to continue.
//         </p>
//       </div>

//       <div className="space-y-4">
//         <Button
//           variant="outline"
//           className="w-full"
//           type="button"
//           onClick={handleGoogleSignIn}
//         >
//           <Chrome className="mr-2 h-4 w-4" />
//           {googleUser ? `Logged in as ${googleUser.name}` : "Continue with Google"}
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
//                   <Input
//                     placeholder="Enter your email address"
//                     {...field}
//                     onChange={(e) => {
//                       field.onChange(e);
//                       form.trigger("email");
//                     }}
//                   />
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
//                   <div className="relative">
//                     <Input
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Enter your password"
//                       {...field}
//                     />
//                     <span
//                       className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                     </span>
//                   </div>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button type="submit" className="w-full" disabled={isLoading}>
//             {isLoading ? "Logging in..." : "Login Account"}
//           </Button>
//         </form>
//       </Form>

//       <p className="text-center text-sm text-muted-foreground">
//         Don&apos;t have an account?{" "}
//         <Link to="/signup" className="text-blue-600 hover:underline">
//           Sign Up
//         </Link>
//       </p>
//     </div>
//   );
// }


// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import * as z from "zod";
// import { Apple, Chrome, Eye, EyeOff } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// const formSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(8, "Password must be at least 8 characters"),
// });

// interface GoogleUser {
//   getBasicProfile(): {
//     getName(): string;
//     getEmail(): string;
//     getImageUrl(): string;
//   };
// }

// export function LoginForm() {
//   const navigate = useNavigate();
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [googleUser, setGoogleUser] = useState<any>(null);

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch("http://localhost:5000/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         console.log("Login successful:", result.message);
//         navigate("/dashboard");
//       } else {
//         console.error("Login failed:", result.message);
//         alert("Invalid credentials. Access is restricted.");
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//       alert("An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleSignIn = () => {
//     window.gapi.auth2.getAuthInstance().signIn().then(
//       (googleUser: GoogleUser) => {
//         const profile = googleUser.getBasicProfile();
//         setGoogleUser({
//           name: profile.getName(),
//           email: profile.getEmail(),
//           imageUrl: profile.getImageUrl(),
//         });
//       },
//       (error: any) => {
//         console.error("Google sign-in error:", error);
//       }
//     );
//   };

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://apis.google.com/js/platform.js";
//     script.async = true;
//     script.onload = () => {
//       window.gapi.load("auth2", () => {
//         window.gapi.auth2.init({
//           client_id: "YOUR_GOOGLE_CLIENT_ID",
//         });
//       });
//     };
//     document.body.appendChild(script);
//   }, []);

//   return (
//     <div className="space-y-6">
//       <div className="space-y-2 text-center">
//         <h2 className="text-2xl font-semibold tracking-tight">Login Account</h2>
//         <p className="text-sm text-muted-foreground">
//           Welcome back, login to continue.
//         </p>
//       </div>

//       <div className="space-y-4">
//         <Button
//           variant="outline"
//           className="w-full"
//           type="button"
//           onClick={handleGoogleSignIn}
//         >
//           <Chrome className="mr-2 h-4 w-4" />
//           {googleUser ? `Logged in as ${googleUser.name}` : "Continue with Google"}
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
//                   <Input
//                     placeholder="Enter your email address"
//                     {...field}
//                     onChange={(e) => {
//                       field.onChange(e);
//                       form.trigger("email");
//                     }}
//                   />
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
//                   <div className="relative">
//                     <Input
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Enter your password"
//                       {...field}
//                     />
//                     <span
//                       className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                     </span>
//                   </div>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button type="submit" className="w-full" disabled={isLoading}>
//             {isLoading ? "Logging in..." : "Login Account"}
//           </Button>
//         </form>
//       </Form>

//       <p className="text-center text-sm text-muted-foreground">
//         Don&apos;t have an account?{" "}
//         <Link to="/signup" className="text-blue-600 hover:underline">
//           Sign Up
//         </Link>
//       </p>
//     </div>
//   );
// }
