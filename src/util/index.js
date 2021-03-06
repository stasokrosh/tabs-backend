import { findUser } from "../user/user.service";
import { USER_ROLES } from "../user/user.model";

export function getHash(string) {
    var hash = 0, i, chr;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
        chr = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash;
};

export const ERROR_STATUSES = {
    BAD_REQUEST : 400,
    AUTH_FAILED : 401,
    FORBIDDEN : 403,
    NOT_FOUND : 404,
    ENTITY_EXISTS : 422,
    INTERNAL : 500
}

export function getErrorStatus(error) {
    return (error.code === 11000) ? ERROR_STATUSES.ENTITY_EXISTS : ERROR_STATUSES.INTERNAL;
}

export function handleError(error, res) {
    console.log(error);
    res.status(getErrorStatus(error)).send(error.message);
}

export function sendErrorResponse(code, res) {
    res.status(code).end();
} 

export async function getUserFromAuth(auth) {
    return auth && auth.role === USER_ROLES.USER ? await findUser(auth.name) : null;
}



