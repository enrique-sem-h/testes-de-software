import * as db from '../db.js';

const home = (req, res) => {
  res.render('login');
}

const login = (req, res) => {
    res.render('login');
}

const register = (req, res) => {
    res.render('register');
}

const dashboard = async (req, res) => {
    const user = await db.getUser(req.user.id);
    res.status(200).send(`Welcome ${user.name}`);
}

export {
    home,
    login,
    register,
    dashboard
}