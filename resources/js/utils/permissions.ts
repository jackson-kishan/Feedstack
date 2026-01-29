
export const hasPermission = (
    permissions: string[] = [],
    required: string,
) => permissions.includes(required);

export const hasRole = (
    roles: string[] = [],
    required: string,
) => roles.includes(required);
