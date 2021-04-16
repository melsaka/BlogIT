const Transformer = require(`${$transformers}/Transformer`);

const TopicTransformer =  new Transformer;

TopicTransformer.resource = (item) => {
	const data = {
		id: item._id,
		name: item.name,
		slug: item.slug,
		created: item.created,
		updated: item.updated
	}

	if (item.posts) {
		data.posts = item.posts;
	}

	return data;
};

module.exports = TopicTransformer;