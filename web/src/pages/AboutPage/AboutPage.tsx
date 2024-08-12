import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const AboutPage = () => {
  return (
    <>
      <Metadata title="About" description="About Movie Mashup" />
      <div className="container mx-auto px-4 py-8 font-movie-subtitle">
        <h1 className="mb-6 text-4xl font-bold">About Movie Mashup</h1>
        <p className="mb-4">
          Movie Mashup is an innovative project that combines the magic of
          cinema with the power of AI to create unique movie concepts.
          Here&apos;s how it works:
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-gradient-to-br from-orange-100 to-yellow-100 p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-semibold text-orange-500">
              Key Features
            </h2>
            <ul className="space-y-2">
              {[
                'Select two movies to mash together',
                'AI-generated movie title, tagline, and treatment',
                'AI-generated movie poster',
                'Multiple poster variations with adjustable realism levels',
                'Realism levels mapped to Fal models:',
                '- LOW: fast-lightning-sdxl',
                '- MEDIUM: flux/schnell',
                '- HIGH: aura-flow',
                '- ULTRA: flux-realism',
                'Set current poster on mashup',
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-gradient-to-br from-red-100 to-yellow-100 p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-semibold text-red-500">
              Technologies Used
            </h2>
            <ul className="space-y-2">
              {[
                'RedwoodJS as the fullstack framework',
                'React for the frontend',
                'GraphQL for API queries and mutations',
                'Prisma for database management',
                'Langbase for AI-powered text generation',
                'FAL.ai for AI-powered image generation',
                'Unkey for rate limiting via GraphQL directives',
                'Cursor for AI-powered IDE',
                'TailwindCSS for styling',
              ].map((tech, index) => (
                <li key={index} className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="mb-3 mt-3 text-2xl font-semibold">How It Works</h2>

        <h3 className="mb-2 text-xl font-semibold">Movie Mashup Generation</h3>
        <p className="mb-4">
          When you select two movies, we use LangBase to generate a unique movie
          concept. Here&apos;s a simplified version of how it works:
        </p>
        <pre className="mb-4 overflow-x-auto rounded bg-gray-100 p-4">
          <code className="language-typescript">
            {`const movieMashupGenerator = async ({
  firstMovieTitle,
  secondMovieTitle,
}) => {
  const response = await fetch('https://api.langbase.com/beta/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: \`Bearer \${process.env.LANGBASE_MOVIE_MASHUP_PIPE_API_KEY}\`,
    },
    body: JSON.stringify({
      variables: [
        { name: 'firstMovieTitle', value: firstMovieTitle },
        { name: 'secondMovieTitle', value: secondMovieTitle },
      ],
    }),
  })

  const { completion } = await response.json()
  return JSON.parse(completion)
}`}
          </code>
        </pre>

        <h3 className="mb-2 text-xl font-semibold">Poster Generation</h3>
        <p className="mb-4">
          Once we have the movie concept, we use FAL.ai to generate a movie
          poster. Here&apos;s a simplified version of the poster generation
          process:
        </p>
        <pre className="mb-4 overflow-x-auto rounded bg-gray-100 p-4">
          <code className="language-typescript">
            {`const generateMovieMashupPosterUrl = async ({
  title,
  tagline,
  description,
  realism = 'LOW',
}) => {
  const prompt = \`
    Artistic style of a movie poster with imagery for the movie called \${tagline} scene:

    Scene: \${description}

    Include the title "\${title}" and tagline "\${tagline}" in the poster.

    Include credits and rating.
  \`

  const falModel = PHOTO_REALISM_SETTINGS[realism]

  const result = await fal.run(\`fal-ai/\${falModel}\`, {
    input: { prompt },
    image_size: 'landscape_16_9',
    num_inference_steps: 4,
    num_images: 1,
    enable_safety_checker: true,
  })

  return { falModel, imageUrl: result['images'][0].url }
}`}
          </code>
        </pre>

        <h3 className="mb-2 text-xl font-semibold">Realism Levels</h3>
        <p className="mb-4">
          We offer different levels of realism for the generated posters, each
          mapped to a specific FAL.ai model:
        </p>
        <pre className="mb-4 overflow-x-auto rounded bg-gray-100 p-4">
          <code className="language-typescript">
            {`const PHOTO_REALISM_SETTINGS = {
  LOW: 'fast-lightning-sdxl',
  MEDIUM: 'flux/schnell',
  HIGH: 'aura-flow',
  ULTRA: 'flux-realism',
}`}
          </code>
        </pre>
        <p className="mb-4">
          These settings allow users to choose the level of photorealism in
          their generated movie posters, ranging from faster, less detailed
          results to slower, more realistic outputs.
        </p>

        <h3 className="mb-2 text-xl font-semibold">Rate Limiting</h3>
        <p className="mb-4">
          We use Unkey for rate limiting our GraphQL API. Here&apos;s how it
          works:
        </p>
        <pre className="mb-4 overflow-x-auto rounded bg-gray-100 p-4">
          <code className="language-typescript">
            {`// api/src/lib/unkey.ts
import { Ratelimit } from '@unkey/ratelimit'

export const MovieMashupRatelimit = new Ratelimit({
  rootKey: process.env.UNKEY_ROOT_KEY,
  namespace: process.env.UNKEY_NAMESPACE,
  limit: 20,
  duration: '1m',
  async: true,
})

// api/src/directives/rateLimited/rateLimited.ts
import { createValidatorDirective } from '@redwoodjs/graphql-server'
import { MovieMashupRatelimit } from 'src/lib/unkey'

export const schema = gql\`
  directive @rateLimited(identifier: String!) on FIELD_DEFINITION
\`

const validate: ValidatorDirectiveFunc = async ({ directiveArgs }) => {
  const limit = await MovieMashupRatelimit.limit(directiveArgs.identifier)
  if (!limit.success) {
    throw new AuthenticationError('Too busy. Try again later.')
  }
}

const rateLimited = createValidatorDirective(schema, validate)
export default rateLimited`}
          </code>
        </pre>
        <p className="mb-4">
          This setup allows us to apply rate limiting to specific GraphQL fields
          or mutations using the @rateLimited directive. It limits requests to
          20 per minute per identifier, helping to prevent abuse and ensure fair
          usage of our API.
        </p>

        <p className="mb-4">
          These are just simplified examples. The actual implementation includes
          error handling, logging, and integration with our database and GraphQL
          API.
        </p>

        <p className="mb-4">
          Want to see it in action?{' '}
          <Link
            to={routes.newMovieMashup()}
            className="text-blue-600 hover:underline"
          >
            Create a new movie mashup
          </Link>{' '}
          and experience the magic yourself!
        </p>

        <h3 className="mb-2 mt-6 text-xl font-semibold">Database Schema</h3>
        <p className="mb-4">
          We use Prisma as our ORM. Here&apos;s our current database schema:
        </p>

        <pre className="mb-4 overflow-x-auto rounded bg-gray-100 p-4">
          <code className="language-prisma">
            {`model Movie {
  id                 String        @id
  createdAt          DateTime      @default(now())
  updatedAt          DateTime      @updatedAt
  title              String        @unique
  overview           String?
  releaseDate        DateTime?
  photo              String
  firstMovieMashups  MovieMashup[] @relation("firstMovie")
  secondMovieMashups MovieMashup[] @relation("secondMovie")
}

model MovieMashup {
  id            String   @id @default(cuid())
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  title         String
  tagline       String
  treatment     String
  description   String
  photos        Photo[]
  firstMovie    Movie    @relation("firstMovie", fields: [firstMovieId], references: [id])
  firstMovieId  String
  secondMovie   Movie    @relation("secondMovie", fields: [secondMovieId], references: [id])
  secondMovieId String
}

model Photo {
  id            String       @id @default(cuid())
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
  falModel      String
  imageUrl      String
  movieMashup   MovieMashup? @relation(fields: [movieMashupId], references: [id])
  movieMashupId String?
}`}
          </code>
        </pre>
        <p>
          The mashup current poster is the most recently updated photo. When
          setting the current poster, we update the photo associated with the
          movie mashup to set the current time as the updatedAt time.
        </p>

        <h3 className="mb-2 mt-6 text-xl font-semibold">
          Key GraphQL Mutations
        </h3>
        <p className="mb-4">
          Our application uses several key GraphQL mutations to handle the
          creation of movie mashups and management of posters:
        </p>

        <h4 className="mb-2 text-lg font-semibold">Creating a Movie Mashup</h4>
        <p className="mb-4">
          The <code>mashMovies</code> mutation is responsible for creating a new
          movie mashup:
        </p>
        <pre className="mb-4 overflow-x-auto rounded bg-gray-100 p-4">
          <code className="language-graphql">
            {`mutation MashMovies($input: MashMoviesInput!) {
  mashMovies(input: $input) {
    id
    title
    tagline
    treatment
    description
    photos {
      id
      imageUrl
    }
  }
}`}
          </code>
        </pre>
        <p className="mb-4">This mutation does the following:</p>
        <ol className="mb-4 list-decimal pl-6">
          <li>Retrieves the selected movies</li>
          <li>Generates a unique movie concept using LangBase</li>
          <li>Creates a movie poster using FAL.ai</li>
          <li>Saves the new mashup and its initial poster to the database</li>
        </ol>

        <h4 className="mb-2 text-lg font-semibold">Managing Movie Posters</h4>
        <p className="mb-4">
          After the initial creation, users can generate additional posters or
          set an existing poster as the main one for a mashup. This is handled
          by two mutations:
        </p>

        <h5 className="text-md mb-2 font-semibold">Creating a new poster</h5>
        <pre className="mb-4 overflow-x-auto rounded bg-gray-100 p-4">
          <code className="language-graphql">
            {`mutation CreatePhoto($input: CreatePhotoInput!) {
  createPhoto(input: $input) {
    id
    photos {
      id
      imageUrl
    }
  }
}`}
          </code>
        </pre>

        <h5 className="text-md mb-2 font-semibold">
          Setting an existing poster as the main one
        </h5>
        <pre className="mb-4 overflow-x-auto rounded bg-gray-100 p-4">
          <code className="language-graphql">
            {`mutation SetMovieMashupPhoto($input: SetMovieMashupPhotoInput!) {
  setMovieMashupPhoto(input: $input) {
    id
    photos {
      id
      imageUrl
    }
  }
}`}
          </code>
        </pre>

        <p className="mb-4">
          These mutations allow users to interact with the movie mashup posters,
          generating new ones with different realism levels and selecting which
          poster should be the main one for a mashup.
        </p>

        <h3 className="mb-2 mt-6 text-xl font-semibold">Rate Limiting</h3>
        <p className="mb-4">
          To ensure fair usage and prevent abuse, these mutations are protected
          by rate limiting using the <code>@rateLimited</code> directive:
        </p>
        <pre className="mb-4 overflow-x-auto rounded bg-gray-100 p-4">
          <code className="language-graphql">
            {`type Mutation {
  mashMovies(input: MashMoviesInput!): MovieMashup!
    @rateLimited(identifier: "mashMovies")
  createPhoto(input: CreatePhotoInput!): MovieMashup!
    @rateLimited(identifier: "createPhoto")
  setMovieMashupPhoto(input: SetMovieMashupPhotoInput!): MovieMashup!
    @rateLimited(identifier: "setMovieMashupPhoto")
}`}
          </code>
        </pre>
        <p className="mb-4">
          This setup helps to maintain the stability and fairness of our API,
          ensuring that all users have a chance to create and customize their
          movie mashups.
        </p>
      </div>
    </>
  )
}

export default AboutPage
