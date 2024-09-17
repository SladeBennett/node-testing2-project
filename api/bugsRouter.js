const express = require('express')
const router = express.Router()
const Bug = require('./bugsModel')

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const delBug = await Bug.deleteBug(id)
    res.status(200).json(delBug)
})


module.exports = router