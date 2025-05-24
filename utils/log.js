import { IS_PRODUCTION } from "@/lib/routes";

export function logger(...args) {
    if (!IS_PRODUCTION) {
        console.log('GHANA INSIGHTS LOGS::::>>>', ...args);
    }

    throw new Error(...args);
};