import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, BotMessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import NavbarPanda from "@/images/PandaNavbar.jpg";

export function DashboardNavbar({
  showMoreAccountsButton = false,
  showAccountsButton = false,
}: {
  showMoreAccountsButton?: boolean;
  showAccountsButton?: boolean;
}) {
  const location = useLocation();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Get user info from localStorage (assuming it's set during login)
    const storedUser = localStorage.getItem('users');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.firstName); // Set firstName for display
    } else {
      // If not found in localStorage, fetch from the backend
      const fetchUserDetails = async () => {
        try {
          // Fetch the user details using userId or any other method based on your route
          const userId = "680e1e07df477da3da95f76f";  // Replace with actual userId or fetch from localStorage/token
          const response = await fetch(`http://localhost:5000/api/user-details?userId=${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserName(data.firstName); // Set firstName from the API response
          } else {
            console.error('Failed to fetch user details');
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

      fetchUserDetails(); // Call this to fetch data after login
    }
  }, []);

  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <h1 className="text-2xl font-semibold text-blue-900">
        Welcome Back{userName ? `, ${userName}` : ''}
      </h1>

      <div className="flex items-center gap-4">
        {/* Buttons */}
        {location.pathname !== "/supportGenie" && (
          <Button variant="outline" size="sm" className="bg-green-600 text-white hover:bg-green-700 rounded-full">
            <Link to="/supportGenie" className="flex items-center">
              <BotMessageSquare className="mr-2" /> Genie
            </Link>
          </Button>
        )}
        {location.pathname === "/supportGenie" && (
          <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700 rounded-full">
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        )}
        <Button variant="outline" size="sm" className="bg-green-600 text-white hover:bg-green-700 rounded-full">
          <Link to="/salesScout">Sales Scout</Link>
        </Button>
        <Button variant="outline" size="sm" className="bg-green-600 text-white hover:bg-green-700 rounded-full">
          <Link to="/pos">POS</Link>
        </Button>
        {showMoreAccountsButton && (
          <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700 rounded-full">
            <Link to="/moreAccounts">More Accounts</Link>
          </Button>
        )}
        {showAccountsButton && (
          <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700 rounded-full">
            <Link to="/accounts">Accounts</Link>
          </Button>
        )}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            1
          </span>
        </Button>

        {/* Avatar + User Info */}
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage alt="User" src={NavbarPanda} />
            <AvatarFallback>{userName ? userName.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-medium text-blue-900">
              {userName || 'Username'}
            </p>
            <p className="text-muted-foreground text-blue-900">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}


// import { Bell, BotMessageSquare } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import NavbarPanda from "@/images/PandaNavbar.jpg";
// import { Link, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";

// export function DashboardNavbar({
//   showMoreAccountsButton = false,
//   showAccountsButton = false,
// }: {
//   showMoreAccountsButton?: boolean;
//   showAccountsButton?: boolean;
// }) {
//   const location = useLocation();
//   const [userName, setUserName] = useState<string | null>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       const user = JSON.parse(storedUser);
//       setUserName(user.name);  // ⬅️ using name now
//     }
//   }, []);

//   return (
//     <header className="flex h-16 items-center justify-between border-b px-6">
//       <h1 className="text-2xl font-semibold text-blue-900">
//         Welcome Back{userName ? `, ${userName}` : ''}
//       </h1>

//       <div className="flex items-center gap-4">
//         {/* Buttons */}
//         {location.pathname !== "/supportGenie" && (
//           <Button variant="outline" size="sm" className="bg-green-600 text-white hover:bg-green-700 rounded-full">
//             <Link to="/supportGenie" className="flex items-center">
//               <BotMessageSquare className="mr-2" /> Genie
//             </Link>
//           </Button>
//         )}
//         {location.pathname === "/supportGenie" && (
//           <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700 rounded-full">
//             <Link to="/dashboard">Dashboard</Link>
//           </Button>
//         )}
//         <Button variant="outline" size="sm" className="bg-green-600 text-white hover:bg-green-700 rounded-full">
//           <Link to="/salesScout">Sales Scout</Link>
//         </Button>
//         <Button variant="outline" size="sm" className="bg-green-600 text-white hover:bg-green-700 rounded-full">
//           <Link to="/pos">POS</Link>
//         </Button>
//         {showMoreAccountsButton && (
//           <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700 rounded-full">
//             <Link to="/moreAccounts">More Accounts</Link>
//           </Button>
//         )}
//         {showAccountsButton && (
//           <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700 rounded-full">
//             <Link to="/accounts">Accounts</Link>
//           </Button>
//         )}
//         <Button variant="ghost" size="icon" className="relative">
//           <Bell className="h-5 w-5" />
//           <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
//             1
//           </span>
//         </Button>

//         {/* Avatar + User Info */}
//         <div className="flex items-center gap-2">
//           <Avatar>
//             <AvatarImage alt="User" src={NavbarPanda} />
//             <AvatarFallback>{userName ? userName.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
//           </Avatar>
//           <div className="text-sm">
//             <p className="font-medium text-blue-900">
//               {userName || 'Username'}
//             </p>
//             <p className="text-muted-foreground text-blue-900">Admin</p>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
