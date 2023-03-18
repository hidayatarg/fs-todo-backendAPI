const express = require('express');
const router = express.Router();

const todoRoutes = require('../routes/todo.routes');
router.use('/api/v1', todoRoutes);


router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'info: Node.js Api Running',
    })
});

module.exports = router;
