export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: string;
}

export interface SelectProps {
    label: string;
    name: string;
    className: string;
    children: React.ReactNode;
    errors: Array<any>;
}
export interface IconProps {
    name: string;
    className: string;
}

export interface SeoProps {
    title: string;
    description: string;
    name: string;
    type: string;
}

export interface FlashMessageProps {
    flash: { success: string; error: string };
    errors: any[];
    [key: string]: any;
}

export interface FilterProps {
    filters: { role: string; search: string; trashed: string };
    [key: string]: any;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
