import { type ClassValue, clsx} from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phone: string): string {
    let p = phone;

    if (p.length > 12) {
        p = p.replace(/(\d\d)(\d\d)(\d{5})(\d*).*/, "(+$1) ($2) $3-$4");
    } else if (p.length > 8) {
        p = p.replace(/^(\d\d)(\d\d)(\d{4})(\d*).*/, "(+$1) ($2) $3-$4");
    }

    return p;
}