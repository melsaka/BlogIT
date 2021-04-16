const Transformer = require(`${$transformers}/Transformer`);

const PostTransformer =  new Transformer;

PostTransformer.resource = (item) => {
	return {
		id: item._id,
		title: item.title,
		slug: item.slug,
		body: item.body,
		stats: item.stats,
		topic: item.topic,
		created: item.created,
		updated: item.updated
	}
};

module.exports = PostTransformer;