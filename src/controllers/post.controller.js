import { db } from "../database/database.connection.js";

export async function addPost(req, res) {
    const { image, description } = req.body
    const { id } = res.locals.user

    try {

        const result = await db.query(`
            INSERT INTO posts (image, description, "userId") VALUES ($1, $2, $3)
        `, [image, description, id])

        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getPost(req, res) {
 
     try {
         
             const result = await db.query(`
             SELECT users.id, users.name, users.image as "profilePicture",
             posts.image,
             posts.description,
             posts."createdAt"
             FROM users
             INNER JOIN posts ON posts."userId" = users.id
             ORDER BY posts."createdAt" DESC;
             `)
             res.send(result.rows)

     } catch (err) {
         res.status(500).send(err.message)
     }
 }

export async function getPostById(req, res) {
   const { id } = req.params

    try {

        const result = await db.query(`
        SELECT users.id, users.name, users.image as "profilePicture",
        posts.image,
        posts.description,
        posts."createdAt"
        FROM users
        LEFT JOIN posts ON posts."userId" = users.id
        WHERE posts."userId" = $1
        ORDER BY posts."createdAt" DESC;
        `, [id])

        res.send(result.rows)

    } catch (err) {
        res.status(500).send(err.message)
    }
}