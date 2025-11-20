import * as db from '../db.js';

const uploadFile = async (req, res) => {
    if (req.file) {
        const { title, description, subject, level, type } = req.body;
        const { path, size } = req.file;
        const author_id = req.user.id;
        await db.uploadMaterial(title, description, subject, level, type, path, author_id, size);
    }
    return res.status(200).redirect('/dashboard');
}

export default {
    uploadFile
}