import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const LockCurrentRoute = () => {
  const location = useLocation();
  const [lockedPath, setLockedPath] = useState<string | null>(null);

  useEffect(() => {
    if (!lockedPath) {
      setLockedPath(location.pathname);
    }
  }, [location.pathname, lockedPath]);

  if (lockedPath && location.pathname !== lockedPath) {
    return <Navigate to={lockedPath} replace />;
  }

  return <Outlet />;
};

export default LockCurrentRoute;
