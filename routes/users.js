let express = require('express');
let router = express.Router();
let ItemService = require('../service/user/UsersService');

// 获取列表路由必须置于获取单条记录之前
router.get('/list', ItemService.getList);

router.get('/total', ItemService.getNumber);

router.get('/:id', ItemService.getItem);

router.delete('/', ItemService.deleteItemByQuery);

router.delete('/:id', ItemService.deleteItem);

router.post('/:id', ItemService.updateItem);

router.put('/', ItemService.addItem);

module.exports = router;
