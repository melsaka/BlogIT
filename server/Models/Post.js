const mongoose      = require('mongoose');
const readingTime   = require('reading-time');
const mongoosePaginate = require('mongoose-paginate-v2');

const PostSchema = new mongoose.Schema({
    title:      { type: String, required: true },
    body:       { type: String, required: true },
    topicId:   	{ type: mongoose.ObjectId },
    slug:       { type: String, slug:"title", slugPaddingSize: 4, unique: true, permanent: true, index: true },
    stats:      { type: Object },
    created:    { type: Date, default: Date.now },
    updated:    { type: Date, default: Date.now }
});

PostSchema.plugin(mongoosePaginate);

PostSchema.pre('save', function(next) {
    this.stats = readingTime(this.body);
    next();
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;