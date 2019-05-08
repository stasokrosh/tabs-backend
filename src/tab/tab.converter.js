
export function convertTab(tab, auth) {
    let res = {
        id: tab._id,
        name: tab.name,
        creator: tab.creator,
        public: tab.public,
        group: tab.group
    }
    if (auth && auth.name === tab.creator)
        res.users = tab.users;
    return res;
}

export function convertTabs(tabs, auth) {
    return tabs.map(tab => convertTab(tab, auth));
}