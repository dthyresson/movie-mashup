// import { Pipe } from 'langbase'
import { logger } from 'src/lib/logger'

export const movieMashupGenerator = async ({
  firstMovieTitle,
  secondMovieTitle,
}: {
  firstMovieTitle: string
  secondMovieTitle: string
}) => {
  if (!process.env.LANGBASE_MOVIE_MASHUP_PIPE_API_KEY) {
    throw new Error('LANGBASE_MOVIE_MASHUP_PIPE_API_KEY is not set')
  }

  const url = 'https://api.langbase.com/beta/generate'
  const auth = `Bearer ${process.env.LANGBASE_MOVIE_MASHUP_PIPE_API_KEY}`

  const data = {
    stream: false,
    variables: [
      {
        name: 'firstMovieTitle',
        value: firstMovieTitle,
      },
      {
        name: 'secondMovieTitle',
        value: secondMovieTitle,
      },
    ],
  }

  logger.debug(data, '>> movieMashupGenerator data')

  const headers = {
    'Content-Type': 'application/json',
    Authorization: auth,
  }
  const body = JSON.stringify(data)

  logger.debug({ headers, body }, '>> movieMashupGenerator request data')

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body,
  })

  if (!response.ok) {
    console.error({ response }, 'Bad response from movieMashupGenerator')
    throw new Error('Bad response from movieMashupGenerator')
  }

  if (response.ok) {
    const { completion } = await response.json()
    logger.debug(completion, '>> movieMashupGenerator result')
    try {
      return JSON.parse(completion)
    } catch (error) {
      logger.error(error, '>> movieMashupGenerator error')
    }
  }

  throw new Error('Failed to generate movie mashup')
}
