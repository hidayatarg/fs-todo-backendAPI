const express = require('express');

const router = express.Router();

const {
	findAll,
	findOne,
	create,
	deleteOne,
	update,
	markTodoCompleted,
	markTodoUncompleted,
} = require('../controllers/todo.controller');

// routers
router.route('/todo').get(findAll);
router.route('/todo/:id').get(findOne);
router.route('/todo/new').post(create);
router.route('/todo/:id').delete(deleteOne);
router.route('/todo/:id').put(update);
router.route('/todo/:id/completed').put(markTodoCompleted);
router.route('/todo/:id/uncompleted').put(markTodoUncompleted);

// router.get('/todo', (req, res) => {
//   res.status(200).json({
//       success: true,
//       message: 'todo lists',
//   })
// });

module.exports = router;