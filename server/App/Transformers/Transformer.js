class Transformer {
	collection(items, pagination = false) {
		if (!pagination) {
			return items.map(item => this.resource(item));
		}

		return {
			data: items.docs.map(item => this.resource(item)),
			meta: {
				total: items.totalDocs,
			    pages: items.totalPages,
			    perPage: items.limit,
			    currentPage: items.page,
			    pagingCounter: items.pagingCounter,
			    prevPage: items.prevPage,
			    nextPage: items.nextPage
			}	
		}
	}
}

module.exports = Transformer;