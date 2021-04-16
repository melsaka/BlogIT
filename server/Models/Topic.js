const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    name:       { type: String, required: true },
    slug:       { type: String, slug: "name", slugPaddingSize: 4, unique: true, permanent: true, index: true },
    created:    { type: Date, default: Date.now },
    updated:    { type: Date, default: Date.now },
});

const Topic = mongoose.model('Topic', TopicSchema);

module.exports = Topic;