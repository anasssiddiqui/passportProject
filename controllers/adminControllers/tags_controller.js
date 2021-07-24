const db = require('../../models');
const Helper = require('../../config/helper');
var crypto = require('crypto')
const tags = db.tags
const sequelize = require('sequelize');
var Op = sequelize.Op;
var path = require('path');
var uuid = require('uuid');


module.exports = {
    addcat: async function(req, res) {

        if (req.body.id == "") {

            var find_dublica = await tags.findOne({
                where: {
                    tag: req.body.Category
                }
            });

            if (find_dublica) {
                req.flash('error', 'This Tag is already used');
                res.redirect('/taglist');
                return
            }
            if (req.files == null) {
                req.flash('error', 'Please select image');
                res.redirect('/taglist');
                return
            }
            image_name = "";
            if (req.files && req.files.images) {

                let image = req.files.images;
                var extension = path.extname(image.name);
                var fileimage = uuid() + extension;
                image.mv(process.cwd() + '/public/app-assets/images/users/' + fileimage, function(err) {
                    if (err)
                        return res.status(500).send(err);
                });
                image_name = fileimage;
            }

            const vehcile = await tags.create({
                image: image_name,
                tag: req.body.Category
            });

            req.flash('msg', 'Tag Successfully Added');
        } else {


            var find_dublica = await tags.findOne({
                where: {
                    tag: req.body.Category,
                    [Op.not]: {
                        id: req.body.id
                    }
                }
            });

            if (find_dublica) {
                req.flash('error', 'This Tag is already used');
                res.redirect('/taglist');
                return
            }
            var findimage = await tags.findOne({
                where: {
                    id: req.body.id,
                },
                raw: true
            });
            image_name = findimage.image;
            if (req.files && req.files.images) {

                let image = req.files.images;
                var extension = path.extname(image.name);
                var fileimage = uuid() + extension;
                image.mv(process.cwd() + '/public/app-assets/images/users/' + fileimage, function(err) {
                    if (err)
                        return res.status(500).send(err);
                });
                image_name = fileimage;
            }

            let update = await tags.update({
                image: image_name,
                tag: req.body.Category
            }, {
                where: {
                    id: req.body.id,
                }
            });
            req.flash('msg', 'Tag Successfully Updated');

        }

        res.redirect('/taglist');

    },
    catlist: async function(req, res) {

        var taxdata = await tags.findAll({
            order: [
                ['id', 'DESC'],
            ],
        });
        taxdata = taxdata.map(value => {
            return value.toJSON();
        });
        console.log(taxdata)
        res.render('admin/tagslist', { sessiondata: req.session, response: taxdata, msg: req.flash('msg'), error: req.flash('error'), title: 'tags' });

    },
    cat_statuschange: async function(req, res) {
        console.log("===============================")

        let update = await tags.update({
            status: req.body.status
        }, {
            where: {
                id: req.body.id,
            }
        });
        var status = await tags.count({
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
    deletecat: async function(req, res) {

        const dlt = await tags.destroy({
            where: {
                id: req.body.id
            }
        });
        res.json(1);
    },


}