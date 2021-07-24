const db = require('../../models');
const Helper = require('../../config/helper');
var crypto = require('crypto')
const imagesSection = db.imagesSection
const sequelize = require('sequelize');



module.exports = {
    delete_image: async function(req, res) {
        //console.log("hello i am there");return


        let deleteImages = await imagesSection.destroy({
            where: {
                id: req.body.id,
            }
        });

        res.send("1")


    },

    addnewimage: async function(req, res) {
        let getFiles = req.files;
        let emptyArr = [];
        if (req.files == null) {
            res.redirect('/admin/getimages')
        } else {
            if (Array.isArray(getFiles.image)) {

                for (var i in getFiles.image) {
                    Images = Helper.new_image_Upload(getFiles.image[i]);

                    let tempObj = {
                        images: Images
                    }
                    emptyArr.push(tempObj);
                }

                let BulkImages = await imagesSection.bulkCreate(emptyArr);
                if (BulkImages) {
                    req.flash('msg', 'Images Successfully Added');
                    res.redirect('getimages');
                } else {
                    console.log(error)
                }
            } else {
                Images = Helper.new_image_Upload(getFiles.image);
                var create_users = await imagesSection.create({
                    image: Images
                });
                if (create_users) {
                    req.flash('msg', 'Image Successfully Added');
                    res.redirect('getimages');
                } else {
                    console.log(error)
                }
            }
        }

    },

    getimages: async function(req, res) {
        var images_data = await imagesSection.findAll({


            order: [
                ['id', 'DESC'],
            ],

        });

        images_data = images_data.map(value => {
            return value.toJSON();
        });


        res.render('admin/imageslist', { sessiondata: req.session, GetAllImage: images_data, msg: req.flash('msg'), error: req.flash('error'), title: 'images' });

    },




}