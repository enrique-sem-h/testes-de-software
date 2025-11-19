import * as db from '../db.js';

const index = (req, res) => {
  res.render('index');
}

const login = (req, res) => {
    res.render('login');
}

const register = (req, res) => {
    res.render('register');
}

const dashboard = async (req, res) => {
    const user = await db.getUser(req.user.id);
    res.status(200).render('dashboard', { user });
}

export {
    index,
    login,
    register,
    dashboard
}