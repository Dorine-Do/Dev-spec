const express = require('express');
const app = express();
const connectDB = require('../../utils/connectDB')

app.use(express.json())

app.get('/', async (req, res) => {
    try {
        const connection = await connectDB()
        await connection.query(`SELECT * FROM Commands`)
            .then(([commands]) => {
                res.status(200).send(commands)
            })
            .catch(error => {
                console.error('Failed to display all commands: ' + error)
                res.status(500).send('Failed to display all commands')
            })
        
    } catch (error) {
        console.error('Failed to display all command: ' + error)
    }
})

app.get('/:id', async (req, res) => {
    try {
        const connection = await connectDB()
        await connection.query(`SELECT * FROM Commands WHERE id = ?`, [req.params.id])
            .then(([command]) => {
                if (command.length > 0) {
                    res.status(200).send(command)
                } else {
                    res.status(404).send('Command not found')
                }
            })
            .catch(error => {
                console.error('Failed to display command: ' + error)
                res.status(500).send('Failed to display command')
            })
        
    } catch (error) {
        console.error('Failed to display command: ' + error)
    }
})

app.post('/', async (req, res) => {
    const commandData = {
        dateCreated: req.body.dateCreated,
        dateShipped: req.body.dateShipped,
        status: req.body.status,
        userId: req.body.userId
    }

    try {
        const connection = await connectDB()
        await connection.query(`
            INSERT INTO Commands (dateCreated, dateShipped, status, userId)
            VALUES (?, ?, ?, ?)
        `, [commandData.dateCreated, commandData.dateShipped, commandData.status, commandData.userId])
        res.status(201).send('Command inserted in the database')
    } catch (error) {
        res.status(500).send('Failed to insert command in the database')
        console.error('Failed to insert command in the database: ' + error)
    }
})

app.put('/:id', async (req, res) => {
    const commandData = {
        dateCreated: req.body.dateCreated,
        dateShipped: req.body.dateShipped,
        status: req.body.status,
        userId: req.body.userId
    }

    try {
        const connection = await connectDB()
        await connection.query(`
            UPDATE Commands
            SET dateCreated = ?, dateShipped = ?, status = ?, userId = ?
            WHERE id = ?
        `, [commandData.dateCreated, commandData.dateShipped, commandData.status, commandData.userId, req.params.id])
        res.status(200).send('Command updated in the database')
    } catch (error) {
        res.status(500).send('Failed to update command in the database')
        console.error('Failed to update command in the database: ' + error)
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const connection = await connectDB()
        await connection.query(`DELETE FROM Commands WHERE id = ?`, [req.params.id])
        res.status(200).send('Command deleted from the database')
    } catch (error) {
        res.status(500).send('Failed to delete command from the database')
        console.error('Failed to delete command from the database: ' + error)
    }
})

module.exports = app