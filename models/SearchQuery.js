const mongoose = require('../config/db');

const searchResultSchema = new mongoose.Schema({
    title: String,
    summary: String,
    thumbnail: String
});

const searchQuerySchema = new mongoose.Schema({
    query: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    results: [searchResultSchema]
});

const SearchQuery = mongoose.model('SearchQuery', searchQuerySchema, 'searchQueries');

module.exports = SearchQuery;
