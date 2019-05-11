
export function convertUser(user, auth) {
    let res = {
        name : user.name,
        favouriteTabs : user.favouriteTabs,
        groups : user.groups,
        image: user.image
    };
    return res;
}

export function convertUsers(users, auth) {
    return users.map(user => convertUser(user, auth));
}
