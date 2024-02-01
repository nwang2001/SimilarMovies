# Movie Search App

This is a Node.js application that allows you to search for movies and find similar movies using the TMDB API.

## Prerequisites

Before running the application, make sure you have the following installed on your machine:

- Node.js (version 12 or above)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/movie-search-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd movie-search-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory of the project.
2. In the `.env` file, add your TMDB API key:

   ```plaintext
   API_KEY=your-tmdb-api-key
   ```

## Usage

To search for similar movies, run the following command:

```bash
node app.js "movie name"
```

Replace `"movie name"` with the name of the movie you want to search for.

Example:

```bash
node app.js "Inception"
```

The application will display a list of similar movies for the provided movie name.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [TMDB API](https://developers.themoviedb.org/3)
- [request module](https://www.npmjs.com/package/request)

Feel free to customize the README file as per your requirements.