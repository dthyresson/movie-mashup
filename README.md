# Movie Mashup

Movie Mashup is an innovative project that combines the magic of cinema with the power of AI to create unique movie concepts.

## Key Features

- Select two movies to mash together
- AI-generated movie title, tagline, and treatment
- AI-generated movie poster
- Multiple poster variations with adjustable realism levels
- Set current poster on mashup

## Technologies Used

- RedwoodJS as the fullstack framework
- React for the frontend
- GraphQL for API queries and mutations
- Prisma for database management
- Langbase for AI-powered text generation
- FAL.ai for AI-powered image generation
- Unkey for rate limiting via GraphQL directives
- Cursor for AI-powered IDE
- TailwindCSS for styling

## How It Works

### Movie Mashup Generation

We use Langbase to generate a unique movie concept when you select two movies. The process involves making an API call to Langbase with the titles of the selected movies.

### Poster Generation

Once we have the movie concept, we use FAL.ai to generate a movie poster. The poster generation process involves creating a prompt based on the movie concept and using different FAL.ai models for various realism levels.

### Realism Levels

We offer different levels of realism for the generated posters, each mapped to a specific FAL.ai model:

- LOW: fast-lightning-sdxl
- MEDIUM: flux/schnell
- HIGH: aura-flow
- ULTRA: flux-realism

### Rate Limiting

We use Unkey for rate limiting our GraphQL API. This helps prevent abuse and ensure fair usage of our API.

## Database Schema

We use Prisma as our ORM. Our database schema includes models for Movies, MovieMashups, and Photos.

## Key GraphQL Mutations

- `mashMovies`: Creates a new movie mashup
- `createPhoto`: Generates a new poster for an existing mashup
- `setMovieMashupPhoto`: Sets an existing poster as the main one for a mashup

These mutations are protected by rate limiting to ensure fair usage and prevent abuse.

## Getting Started

To see Movie Mashup in action, [create a new movie mashup](https://your-app-url.com/new-mashup) and experience the magic yourself!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
