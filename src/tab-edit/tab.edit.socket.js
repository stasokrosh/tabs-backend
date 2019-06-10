
class SocketConnection {
    constructor() {
        this._clients = new Map();
    }

    connect(ws, req) {
        try {
            let tabId = req.params.id;
            let name = req.params.name
            let tabClients = this._clients.get(tabId);
            if (!tabClients) {
                this._clients.set(tabId, []);
                tabClients = this._clients.get(tabId);
            }
            tabClients.push({ socket: ws, userName: name });
            ws.on("close", () => {
                this.disconnect(name, tabId);
            });
            console.log("connected");
        } catch (err) {
            console.log(err);
        }
    }

    disconnect(name, tabId) {
        let tabClients = this._clients.get(tabId);
        if (tabClients) {
            let clientIndex = tabClients.findIndex((el) => el.userName === name);
            if (clientIndex !== -1) {
                tabClients.splice(clientIndex, 1);
            }
        }
        console.log("disconnected");
    }

    broadcast(tabId, message, sender) {
        let tabClients = this._clients.get(tabId);
        if (tabClients) {
            for (let tabClient of tabClients)
                if (tabClient.userName !== sender) {
                    tabClient.socket.send(message);
                }
        }
    }

    isUserConnectedToTab(userName, tabId) {
        let tabClients = this._clients.get(tabId);
        if (tabClients) {
            return tabClients.findIndex((el) => el.userName === userName) !== -1;
        } else {
            return false;
        }
    }
}

export const Connection = new SocketConnection();
