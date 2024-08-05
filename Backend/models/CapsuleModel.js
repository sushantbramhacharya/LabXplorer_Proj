import { pool } from "../config/db.js"

export const insertCapsule=async ()=>{
    try{
        const result = await pool.query(`INSERT INTO capsules (title, description, content, thumbnail, images, category)
        VALUES (
            'Basic Chemistry',
            'Learn the fundamentals of chemistry with interactive experiments.',
            '<p>This is the Quill editor content.</p>',
            'https://via.placeholder.com/150',
            ARRAY['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
            'Chemistry'
        );
        `)
        return result
    }
    catch(err)
    {
        return undefined
    }
}