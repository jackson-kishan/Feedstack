import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'text-black hover:bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-1 my-2 focus:outline-none' +
                (active
                    ? 'bg-gray-300 focus:bg-gray-300'
                    : '') +
                className
            }
        >
            {children}
        </Link>
    );
}
