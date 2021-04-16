const router = require('express').Router();
const PostsController = require(`${$controllers}/PostsController`);
const JWT = require(`${$helpers}/JwtHelper`);

router.get('/', PostsController.index);
router.post('/', JWT.checkTokenMiddleware, PostsController.store);
router.get('/:slug', PostsController.show);
router.put('/:slug', JWT.checkTokenMiddleware, PostsController.update);
router.delete('/:slug', JWT.checkTokenMiddleware, PostsController.destroy);


module.exports = router;