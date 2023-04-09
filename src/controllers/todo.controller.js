const db = require('../config/pool');
const ErrorHandler = require('../utils/errorHandler');

const dbs = require('../config/db.config');
const {Todo} = dbs;


const getAllTodoQuery = 'SELECT * FROM public."Todo" ORDER BY id DESC';
const getTodoByIdQuery = 'SELECT * FROM public."Todo" WHERE id = $1';
const createTodoQuery =
	'INSERT INTO public."Todo" ("title", "isCompleted", "createdAt", "updatedAt") VALUES ($1, $2, Now(), null) RETURNING *';
const deleteTodoByIdQuery = 'DELETE FROM public."Todo" WHERE id = $1';
const updateTodoIsCompleteByIdQuery = 'UPDATE public."Todo" SET "isCompleted" = $1, "updatedAt" = Now()  WHERE id = $2 RETURNING *';


// Retrieve all
exports.findAll = async (req, res, next) => {
	// const result = await db.query(getAllTodoQuery);
	// if (result.rowCount === 0) {
	// 	return next(new ErrorHandler('Todo Not Found', 200));
	// }
	// res.status(200).json({
	// 	success: true,
	// 	data: result.rows,
	// });


	const firstname = req.query.firstname;
	var condition = firstname
	  ? { firstname: { [Op.iLike]: `%${firstname}%` } }
	  : null;
  
	Todo.findAll({ where: condition })
	  .then((data) => {
		res.send(data);
	  })
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || 'Some error occurred while retrieving data.',
		});
	  });
};

// Retrieve by id
exports.findOne = async (req, res, next) => {
	const id = parseInt(req.params.id);
	const result = await db.query(getTodoByIdQuery, [id]);

	if (result.rowCount === 0) {
		return next(new ErrorHandler('Todo Not Found', 404));
	}

	res.status(200).json({
		success: true,
		data: result.rows,
	});
};

// create new todo
exports.create = async (req, res, next) => {
	const { title, isCompleted } = req.body;

	try {
		const result = await db.query(createTodoQuery, [title, isCompleted]);
		res.status(201).json({
			success: true,
			data: result.rows,
		});
	} catch (err) {
		res.json(err.stack);
	}
};

// delete one by id
exports.deleteOne = async (req, res, next) => {
	const id = parseInt(req.params.id);
	try {
		const result = await db.query(deleteTodoByIdQuery, [id]);
		if (result.rowCount === 0) {
			return res.status(200).json({
				success: false,
				message: 'Not Found',
			});
		}
		res.status(200).json({
			success: true,
			message: `Todo with ${id} has been deleted successfully`,
		});
	} catch (err) {
		res.json(err.stack);
	}
};

// update one by id
exports.update = async (req, res, next) => {
	const id = parseInt(req.params.id);
	const {
		isCompleted
	} = req.body;

	try {
		const result = await db.query(updateTodoIsCompleteByIdQuery, [isCompleted, id]);
		res.status(200).json({
			success: true,
			data: result.rows,
		});
	} catch (err) {
		res.json(err.stack);
	}
};

// update task to completed
exports.markTodoCompleted = async (req, res, next) => {
	const id = parseInt(req.params.id);
	const result = await updateTaskStatus(id, true);
	if (result.rowCount === 0) {
		return res.result;
	}
	return res.status(200).json({
		success: true,
		data: result.rows,
	})

};

// update task to uncompleted
exports.markTodoUncompleted = async (req, res, next) => {
	const id = parseInt(req.params.id);
	const result = await updateTaskStatus(id, false);
	if (result.rowCount === 0) {
		return res.result;
	}
	return res.status(200).json({
		success: true,
		data: result.rows,
	})
};

async function updateTaskStatus(id, isCompleted) {
	try {
		const result = await db.query(updateTodoIsCompleteByIdQuery, [isCompleted, id]);
		return result;
	} catch (err) {
		return err.stack;
	}
}