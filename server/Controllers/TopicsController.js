const Post                  = require(`${$models}/Post`);
const Topic                 = require(`${$models}/Topic`);
const FormRequest           = require(`${$requests}/Topic/FormRequest`);
const Respond               = require(`${$helpers}/ApiResponse`);
const Transformer           = require(`${$transformers}/TopicTransformer`);
const PostTransformer       = require(`${$transformers}/PostTransformer`);

TopicsController = {
    index(request, response) {
        $catchBadBoys(request, response, async () => {
            const topics = await Topic.find({}, {}, { sort: { 'created' : -1 } });

            return Respond.ok(response, Transformer.collection(topics));
        });
    },

    store(request, response) {
        const inputs = FormRequest.validate(request, response);
        
        $catchBadBoys(request, response, async () => {
            const topic = new Topic({
                name: inputs.name
            });

            const savedTopic = await topic.save();

            return Respond.created(response, Transformer.resource(savedTopic))
        });
    },

    show(request, response) {
        $catchBadBoys(request, response, async () => {
            const topic = await Topic.findOne({slug: request.params.slug}).lean();

            if ( !topic ) {
                return Respond.notFound(response);
            }

            const page = request.query.page ? request.query.page : 1;
            
            const posts = await Post.paginate({'topicId': topic._id}, {
                page: page,
                limit: 20,
                lean: true,
                sort: { 'created' : -1 }
            });

            topic.posts = PostTransformer.collection(posts, true);

            return Respond.ok(response, Transformer.resource(topic));
        });
    },

    update(request, response) {
        const inputs = FormRequest.validate(request, response);
        
        $catchBadBoys(request, response, async () => {
            const result = await Topic.updateOne({ slug: request.params.slug }, { 
                                            $currentDate: { updated: true }, 
                                            $set: { name: inputs.name } 
                                        });
            if (!result.n) {
                return Respond.notFound(response);
            }

            Post.updateMany({ 'topic.slug': request.params.slug }, 
                            { $set: { 'topic.name': inputs.name } });

            return Respond.noContent(response);
        });
    },

    destroy(request, response) {
        $catchBadBoys(request, response, async () => {
            const result = await Topic.deleteOne({ slug: request.params.slug });
            
            if (result.n) {
                return Respond.noContent(response);
            }

            return Respond.notFound(response);
        });
    }
}

module.exports = TopicsController;