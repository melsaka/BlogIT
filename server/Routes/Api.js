const TopicsRouter = require('./modules/TopicsRouter');
const PostsRouter = require('./modules/PostsRouter');
const AuthRouter = require('./modules/AuthRouter');

module.exports = (app) => {
    app.use('/api/v1/topics', TopicsRouter);
    app.use('/api/v1/posts', PostsRouter);
    app.use('/api/v1/auth', AuthRouter);
    app.use('*', (request, response) => {
    	response.status(404).json('Not Found')
    });
}