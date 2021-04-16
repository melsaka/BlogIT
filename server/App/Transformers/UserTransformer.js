const Transformer = require(`${$transformers}/Transformer`);

const UserTransformer =  new Transformer;

UserTransformer.resource = (item) => {
	return {
		id: item._id,
		name: item.name,
		email: item.email,
		username: item.username,
		created: item.created,
		updated: item.updated,
	}
};

module.exports = UserTransformer;