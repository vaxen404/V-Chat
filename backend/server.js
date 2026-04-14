import express from "express"
import { WebSocketServer } from "ws"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const server = app.listen(3000, () => {
    console.log("server çalıştı: 3000");
})

const wss = new WebSocketServer({ server })

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        const message = data.toString()

        wss.clients.forEach((client) => {
            if(client.readyState === 1){
                client.send(message)
            }
        })
    })
})
