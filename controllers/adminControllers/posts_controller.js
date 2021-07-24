const db = require('../../models');
const Helper = require('../../config/helper');
var crypto = require('crypto')
const posts = db.posts
const sequelize = require('sequelize');
var Op = sequelize.Op;
var path = require('path');
var uuid = require('uuid');
var postsPets = db.postsPets
var jobrequests = db.jobrequests
var occupations = db.occupations


module.exports = {
    editpost: async function(req, res) {

        var posts_data = await posts.findOne({
            attributes: ['id', 'image', 'title', 'description', [sequelize.literal('(select uniqueName FROM users where id=posts.userId)'), 'username'], ],
            where: {
                id: req.query.id
            },
            raw: true
        });
        res.render('admin/editpost', {
            posts_data: posts_data,
            msg: req.flash('msg'),
            error: req.flash('error'),
            sessiondata: req.session,
            title: 'posts'
        });
    },


    postslist: async function(req, res) {
        var posts_data = await posts.findAll({
            attributes: ['id', 'image', 'title', 'description', 'createdAt', [sequelize.literal('(select uniqueName FROM users where id=posts.userId)'), 'username'], ],
            order: [
                ['id', 'DESC'],
            ],
        });
        posts_data = posts_data.map(value => {
            return value.toJSON();
        });

        console.log(posts_data)
        res.render('admin/postslist', { sessiondata: req.session, response: posts_data, msg: req.flash('msg'), error: req.flash('error'), title: 'posts' });

    },
    posts_statuschange: async function(req, res) {
        let update = await posts.update({
            status: req.body.status
        }, {
            where: {
                id: req.body.id,
            }
        });
        var status = await posts.count({
            where: {
                id: req.body.id,
                status: 1,
            }
        });
        // console.log(status, "=============================================count")
        if (status == 1) {
            res.json(1);
        } else {
            res.json(2);
        }
    },
    deletepost: async function(req, res) {

        const dlt = await posts.destroy({
            where: {
                id: req.body.id
            }
        });
        res.json(1);
    },

    updatePost: async function(req, res) {


        const update_posts = await posts.update({
            title: req.body.title,
            description: req.body.description,
        }, {
            where: {
                id: req.body.id
            }

        });

        req.flash('msg', 'Post Successfully Updated');
        res.redirect('/postslist');
    },


}