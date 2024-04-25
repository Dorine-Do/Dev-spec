const express = require("express")
const app = express()
const connectDB = require("../../utils/connectDB")

app.use(express.json())

app.get("/", async (req, res) => {
    try {
        const connection = await connectDB()
        await connection.query(`SELECT * FROM Details_commands`)
            .then(([details_commands]) => {
                res.status(200).send(details_commands)
            })
            .catch(error => {
                console.error('Failed to display all details_commands: ' + error)
                res.status(500).send('Failed to display all details_commands')
            })
        
    } catch (error) {
        console.error('Failed to display all details_command: ' + error)
    }
})

app.get("/:id", async (req, res) => {
    try {
        const connection = await connectDB()
        await connection.query(`SELECT * FROM Details_commands WHERE id = ?`, [req.params.id])
            .then(([details_command]) => {
                if (details_command.length > 0) {
                    res.status(200).send(details_command)
                } else {
                    res.status(404).send("Details_command not found")
                }
            })
            .catch(error => {
                console.error('Failed to display details_command: ' + error)
                res.status(500).send('Failed to display details_command')
            })
        
    } catch (error) {
        console.error('Failed to display details_command: ' + error)
    }
})

app.post("/", async (req, res) => {
    const details_commandData = {
        quantity: req.body.quantity,
        commandId: req.body.commandId,
        productId: req.body.productId
    }

    try {
        const connection = await connectDB()
        await connection.query(`
            INSERT INTO Details_commands (quantity, commandId, productId)
            VALUES (?, ?, ?)
        `, [details_commandData.quantity, details_commandData.commandId, details_commandData.productId])
        res.status(201).send("Details_command inserted in the database")
    } catch (error) {
        console.error("Failed to insert details_command: " + error)
        res.status(500).send("Failed to insert details_command")
    }
})

app.put("/:id", async (req, res) => {
    const details_commandData = {
        quantity: req.body.quantity,
        commandId: req.body.commandId,
        productId: req.body.productId
    }

    try {
        const connection = await connectDB()
        await connection.query(`
            UPDATE Details_commands
            SET quantity = ?, commandId = ?, productId = ?
            WHERE id = ?
        `, [details_commandData.quantity, details_commandData.commandId, details_commandData.productId, req.params.id])
        res.status(200).send("Details_command updated")
    } catch (error) {
        console.error("Failed to update details_command: " + error)
        res.status(500).send("Failed to update details_command")
    }
})

app.delete("/:id", async (req, res) => {
    try {
        const connection = await connectDB()
        await connection.query(`DELETE FROM Details_commands WHERE id = ?`, [req.params.id])
        res.status(200).send("Details_command deleted")
    } catch (error) {
        console.error("Failed to delete details_command: " + error)
        res.status(500).send("Failed to delete details_command")
    }
})

module.exports = app