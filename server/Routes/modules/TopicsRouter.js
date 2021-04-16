const router = require('express').Router();
const TopicsController = require(`${$controllers}/TopicsController`);
const JWT = require(`${$helpers}/JwtHelper`);

router.get('/', TopicsController.index);
router.post('/', JWT.checkTokenMiddleware, TopicsController.store);
router.get('/:slug', TopicsController.show);
router.put('/:slug', JWT.checkTokenMiddleware, TopicsController.update);
router.delete('/:slug', JWT.checkTokenMiddleware, TopicsController.destroy);

module.exports = router;