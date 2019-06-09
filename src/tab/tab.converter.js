
export function convertTab(tab, auth) {
    let res = {
        id: tab._id,
        name: tab.composition.name,
        creator: tab.creator,
        public: tab.public,
        group: tab.group,
        compositionId: tab.composition._id
    }
    if (auth ) {
        
        if (auth.name === tab.creator) {
            res.users = tab.users
        } else {
            let userIndex = tab.users.findIndex((element) => element.name == auth.name);
            if (userIndex !== -1) {
                res.users = [tab.users[userIndex]];
            }
        }
    }
    return res;
}

export function convertTabs(tabs, auth) {
    return tabs.map(tab => convertTab(tab, auth));
}