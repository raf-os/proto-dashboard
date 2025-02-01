export type User = {
    id: string;
    name: string;
    password: string;
}

export type DashboardRoute = {
    id: number;
    name: string;
    route: string;
    icon?: string;
    action?: string;
}