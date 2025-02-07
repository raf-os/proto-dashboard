export type User = {
    id: string;
    name: string;
    password: string;
    associated_phones?: string[];
}

export type DashboardRoute = {
    id: number;
    name: string;
    route: string;
    icon?: string;
    action?: string;
}

export interface IConversationListRequestParams {
    organization_id?: string;
    organization_phone: string;
}

export interface IConversationRequestParams {
    user_phone_number: string;
    organization_phone_number: string;
    organization_id?: string;
}