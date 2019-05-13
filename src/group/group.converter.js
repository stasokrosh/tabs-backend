
export function convertGroup(group, auth) {
    let res = {
        name: group.name,
        creator: group.creator,
        public: group.public,
        image: group.image
    }
    return res;
}

export function convertGroups(groups, auth) {
    return groups.map(group => convertGroup(group, auth));
}