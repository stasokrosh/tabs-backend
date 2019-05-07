
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
    FORBIDDEN : 403,
    NOT_FOUND : 404,
    ENTITY_EXISTS : 422,
    INTERNAL : 500
}

export function getErrorStatus(error) {
    return (error.code === 11000) ? ENTITY_EXISTS : ERROR_STATUSES.INTERNAL;
}

export function handleError(error, res) {
    res.status(getErrorStatus(error)).end();
}


