const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product.controller');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/resources/images/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = '' + Date.now() + Math.round(Math.random() * 1E3) + '.' + file.originalname.split('.').at(-1);
        const saveName = 'p-' + uniqueSuffix;
        req.body.img_url = saveName;
        cb(null, saveName);
    }
})
const upload = multer({ storage: storage })

router.get('/', productController.getAll);
router.get('/create', productController.create);
router.post('/create', upload.single('image'), productController.save);

module.exports = router;