import { db } from "../database/database.connection.js"

export async function followUser(req, res) {
    const { user } = res.locals
    const { id } = req.params

    try {

        const isFollowing = await db.query(`
            SELECT * FROM followers WHERE "userId" = $1 AND "followedBy" = $2
        `, [id, user.id])

        if(isFollowing.rowCount < 1) {
            await db.query(`
            INSERT INTO followers ("userId", "followedBy") VALUES ($1, $2)
            `, [id, user.id])
            return res.sendStatus(201)
        }

        await db.query(`
            DELETE FROM followers WHERE "userId" = $1 AND "followedBy" = $2
        `, [id, user.id])
        res.sendStatus(201)
        
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function listFollowers(req, res) {
    const { user } = res.locals

    try{

        const result = await db.query(`
        SELECT user2.name AS "followedBy"
        FROM followers
        JOIN users AS user2 ON followers."followedBy" = user2.id
        WHERE "userId" = $1
        `, [user.id])
        if(result.rowCount < 1) return res.send("Sem seguidores ainda")
        res.send(result.rows)

    } catch(err) {
        res.status(500).send(err.message)
    }
}

export async function findUserByName(req, res) {
    const { name } = req.body

    try {

        if(!name) return res.sendStatus(422)

        const result = await db.query(`
            SELECT users.id, users.name, users.image
            FROM users
            WHERE users.name = $1
        `, [name])

        res.send(result.rows)

    } catch(err) {
        res.status(500).send(err.message)
    }

}