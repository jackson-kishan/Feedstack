import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function SideNavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'flex items-center gap-3 text-muted-foreground hover:text-red-400 font-medium rounded-lg hover:bg-muted px-3 py-2 focus:outline-none' +
                (active
                    ? ' bg-muted'
                    : 'text-muted-foreground') +
                className
            }
        >
            {children}
        </Link>
    );
}
