import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import React from "react";

type CanProps = {
    permission?: string;
    auth: PageProps['auth'];
    role?: string;
    children: React.ReactNode
}

const Can = ({ auth, permission, role, children}: CanProps) => {
    console.log(auth.user?.roles);

//     const hasAccess =
//     (permission && auth.user.permissions.includes(permission)) ||
//     (role && roles.includes(role));

//   if (!hasAccess) return null;
  return <>{children}</>;
};

export default Can;

