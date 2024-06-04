const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const SearchQuery = require('./models/SearchQuery');  // Import the SearchQuery model

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/search', async (req, res) => {
    const searchQuery = req.body.query;

    try {
        const response = await axios.get('https://en.wikipedia.org/w/api.php', {
            params: {
                action: 'query',
                list: 'search',
                srsearch: searchQuery,
                format: 'json'
            }
        });
        const searchResults = response.data.query.search;

        // Fetch summaries and thumbnails for each result
        const detailedResults = await Promise.all(searchResults.map(async (result) => {
            try {
                const summaryResponse = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(result.title)}`);
                return {
                    title: result.title,
                    summary: summaryResponse.data.extract,
                    thumbnail: summaryResponse.data.thumbnail ? summaryResponse.data.thumbnail.source : null
                };
            } catch (error) {
                return {
                    title: result.title,
                    summary: 'Summary not available',
                    thumbnail: null
                };
            }
        }));

        // Save the search query and results to the database
        const newSearchQuery = new SearchQuery({ query: searchQuery, results: detailedResults });
        await newSearchQuery.save();

        res.render('results', { searchResults: detailedResults, searchQuery });
    } catch (error) {
        res.status(500).send('Error fetching data from Wikipedia API');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
