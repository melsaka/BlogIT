const Post                  = require(`${$models}/Post`);
const Topic                 = require(`${$models}/Topic`);
const CreateRequest         = require(`${$requests}/Post/CreateRequest`);
const UpdateRequest         = require(`${$requests}/Post/UpdateRequest`);
const Respond               = require(`${$helpers}/ApiResponse`);
const Transformer           = require(`${$transformers}/PostTransformer`);

PostsController = {
    index(request, response) {
        $catchBadBoys(request, response, async () => {
            const page = request.query.page ? request.query.page : 1;
            const posts = await Post.paginate({},{
                                        page: page,
                                        limit: 20,
                                        lean: true,
                                        sort: { 'created' : -1 }
                                    });

            const topicsIds = posts.docs.map((post) => post.topicId);

            const topics = await Topic.find({ _id: { $in: topicsIds } });

            posts.docs.filter(post => {
                post.topic = topics.find(topic => post.topicId == topic.id);
            });

            return Respond.ok(response, Transformer.collection(posts, true));
        });
    },

    store(request, response) {
        const inputs = CreateRequest.validate(request, response);

        $catchBadBoys(request, response, async () => {
            const topic = await Topic.findOne({slug: inputs.topic});

            if (!topic) {
                return Respond.validationError(response, [{
                    field   : 'topic',
                    message : 'This topic not exist.'
                }]);
            }

            const post = new Post({
                title   : inputs.title,
                body    : inputs.body,
                topicId : topic._id
            });

            const savedPost = await post.save();

            savedPost.topic = topic;

            return Respond.created(response, Transformer.resource(savedPost));
        });
    },

    show(request, response) {
        $catchBadBoys(request, response, async () => {
            const post = await Post.findOne({ slug: request.params.slug });

            if (!post) {
                return Respond.notFound(response);
            }

            post.topic = await Topic.findOne({ _id: { $in: post.topicId } });

            return Respond.ok(response, Transformer.resource(post));
        });
    },

    update(request, response) {
        const inputs = UpdateRequest.validate(request, response);

        $catchBadBoys(request, response, async () => {
            const data = {
                title: inputs.title, 
                body: inputs.body, 
            };

            if (!request.body.topic) {
                const result = await Post.updateOne({slug: request.params.slug}, 
                                                    { $currentDate: { updated: true }, 
                                                    $set: data });
                if (result.n) {
                    return Respond.noContent(response)
                }

                return Respond.notFound(response)
            }

            const topic = await Topic.findOne({slug: request.body.topic});

            if (!topic) {
                return Respond.validationError(response, [{
                    field: 'topic',
                    message: 'This topic not exist.'
                }]);
            }

            data.topicId = topic._id;
            
            const result = await Post.updateOne({slug: request.params.slug}, 
                                                { $currentDate: { updated: true }, 
                                                $set: data });
            if (result.n) {
                return Respond.noContent(response);
            }
         
            return Respond.notFound(response);
        });
    },

    destroy(request, response) {
        $catchBadBoys(request, response, async () => {
            const result = await Post.deleteOne({slug: request.params.slug});

            if (result.n) {
                return Respond.noContent(response);
            }

            return Respond.notFound(response);
        });
    }
}

module.exports = PostsController;