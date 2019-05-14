export default function TabEditWebSocket(ws, req) {
    ws.on('message', function (msg) {
        TabEditWebSocket(JSON.parse(msg));
    })
}