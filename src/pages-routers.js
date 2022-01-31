const router = require('express').Router();
const Page = require('./pages-model')


// router.post('/', (req, res, next) => {
//     Page.addPage(req.body)
//     .then(newPage => {
//         res.status(201).json(newPage)
//     })
//     .catch(next)
// })

router.post('/', (req, res, next) => {
    res.status(201)
})


module.exports = router