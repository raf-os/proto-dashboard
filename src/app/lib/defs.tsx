export type User = {
    id: string;
    name: string;
    password: string;
    associated_phones?: string[];
    selected_org_phone?: number;
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
    organization_phone_number: string;
}

export interface IConversationRequestParams {
    user_phone_number: string;
    organization_phone_number: string;
    organization_id?: string;
}