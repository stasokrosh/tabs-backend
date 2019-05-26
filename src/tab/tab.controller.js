
import { handleError, ERROR_STATUSES, getUserFromAuth, sendErrorResponse } from '../util/index'
import { USER_ROLES } from '../user/user.model'
import { convertTab, convertTabs } from './tab.converter'
import { createTab, findTab, findAllTabs, findTabsByUser, findFavouriteTabs, updateTab, removeTab, findTabWriters, findTabCreator, findTabsByGroup } from './tab.service';

export async function create(req, res) {
    let auth = req.decoded;
    if (!auth || auth.role === USER_ROLES.ADMIN) {
        res.status(ERROR_STATUSES.FORBIDDEN);
    } else {
        try {
            let tab = await createTab({
                name: req.body.name,
                creator: auth.name,
                users: req.body.users,
                public: req.body.public,
                group: req.body.group
            });
            res.send(convertTab(tab, auth));
        } catch (err) {
            handleError(err, res);
        }
    }
};

export async function findOne(req, res) {
    let auth = req.decoded;
    try {
        let user = await getUserFromAuth(auth);
        let tab = await findTab(req.params.id, user);
        if (!tab)
            sendErrorResponse(ERROR_STATUSES.NOT_FOUND, res);
        else
            res.send(convertTab(tab, auth));
    } catch (err) {
        handleError(err, res);
    }
};

export async function findAll(req, res) {
    let auth = req.decoded;
    try {
        let user = await getUserFromAuth(auth);
        let tabs = await findAllTabs(user);
        res.send(convertTabs(tabs, auth));
    } catch (err) {
        handleError(err, res);
    }
};

export async function findByUser(req, res) {
    let auth = req.decoded;
    try {
        let user = await getUserFromAuth(auth);
        let tabs = await findTabsByUser(req.params.name, user);
        res.send(convertTabs(tabs, auth));
    } catch (err) {
        handleError(err, res);
    }
};

export async function findUserFavourite(req, res) {
    let auth = req.decoded;
    try {
        let user = await getUserFromAuth(auth);
        let tabs = await findFavouriteTabs(req.params.name, user);
        if (!tabs)
            sendErrorResponse(ERROR_STATUSES.NOT_FOUND, res);
        else
            res.send(convertTabs(tabs, auth));
    } catch (err) {
        handleError(err, res);
    }
}

export async function findByGroup(req, res) {
    let auth = req.decoded;
    try {
        let user = await getUserFromAuth(auth);
        let tabs = await findTabsByGroup(req.params.name, user);
        res.send(convertTabs(tabs, auth));
    } catch (err) {
        handleError(err, res);
    }
};

export async function update(req, res) {
    let auth = req.decoded;
    try {
        let writers = await findTabWriters(req.params.id)
        if (!writers) {
            sendErrorResponse(ERROR_STATUSES.NOT_FOUND, res);
        } else if (writers.indexOf(auth.name) !== -1) {
            let tab = await updateTab(req.params.id, req.body, auth);
            res.send(tab);
        } else {
            sendErrorResponse(ERROR_STATUSES.FORBIDDEN, res);
        }
    } catch (err) {
        handleError(err, res);
    }
}

export async function remove(req, res) {
    let auth = req.decoded;
    try {
        let creator = await findTabCreator(req.params.id);
        if (!creator) {
            sendErrorResponse(ERROR_STATUSES.NOT_FOUND, res);
        } else if (!auth || auth.role === USER_ROLES.USER && auth.name !== creator) {
            sendErrorResponse(ERROR_STATUSES.FORBIDDEN, res);
        } else {
            let tab = await removeTab(req.params.id);
            if (!tab)
                res.status(ERROR_STATUSES.NOT_FOUND);
            else
                res.end();
            res.end();
        }
    } catch (err) {
        handleError(err, res);
    }
}

