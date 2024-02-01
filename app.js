// imports the request module used to make http requests
const request = require('request');

// accesses the .env file to get the api key
require('dotenv').config();
const APIKey = process.env.API_KEY;

// function to look up the movie
const movieLookUp = (moviename, callback) => {
    // url constructed with the api key to do the movie search
    const url = 'https://api.themoviedb.org/3/search/movie?query=' + moviename + '&api_key=' + APIKey;
    // http request to the tmdb api
    request({ url, json: true }, (err, res) => {
        // log back errors, or the movie id if no errors
        if (err) {
            callback('Unable to connect.', undefined);
        } else if (res.body.results.length === 0) {
            callback('No results found. Try again.', undefined);
        } else {
            callback(undefined, {
                movieID: res.body.results[0].id
            });
        }
    });
};

// function to find similar movies given the movie id
const moviesSimilar = (movieID, callback) => {
    const url = 'https://api.themoviedb.org/3/movie/' + movieID + '/similar?language=en-US&page=1' + '&api_key=' + APIKey;
    request({ url, json: true }, (err, res) => {
        if (err) {
            callback('Unable to connect.', undefined);
        } else if (res.body.results.length === 0) {
            callback('No similar movies found.', undefined);
        } else {
            callback(undefined, res.body.results);
        }
    });
};

// function to console log the movies' info
function displaySimilarMovies(similarMovies) {
    similarMovies.forEach(movie => {
        console.log('Title:', movie.title);
        console.log('Description:', movie.overview);
        console.log('\n*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*\n');
    });
}

// function to initiate the search for similar movies
function searchMovies(movieName) {
    // calls movieLookUp function to get movie id
    movieLookUp(movieName, (err, result) => {
        if (err) {
            // if error occurs, logs the error
            console.error('Error looking up movie.', err);
        } else {
            // if no error, calls moviesSimilar function to search for similar movies
            moviesSimilar(result.movieID, (error, result) => {
                if (error) {
                    // if error, logs error 
                    console.error('Error getting similar movies.', error);
                } else {
                    // else will log the results
                    console.log('Movie Similar Result:');
                    // calls displaySimilarMovies function to log the results
                    displaySimilarMovies(result);
                }
            });
        }
    });
}

// get the search term from the user inputted command line arguments
const searchTerm = process.argv.slice(2).join(' ');
// logs the search term
console.log('Search Term:', searchTerm);
console.log('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*\n');

// executes the search given the info
searchMovies(searchTerm);