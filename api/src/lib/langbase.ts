import { Pipe } from 'langbase'

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

  const pipe = new Pipe({
    apiKey: process.env.LANGBASE_MOVIE_MASHUP_PIPE_API_KEY,
  })

  const options = {
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

  try {
    logger.debug(options, '>> movieMashupGenerator options')

    const result = await pipe.generateText(options)

    if (!result.completion) {
      console.error({ result }, 'Bad response from movieMashupGenerator')
      throw new Error('Bad response from movieMashupGenerator')
    }

    const { completion } = result
    logger.debug(completion, '>> movieMashupGenerator completion')

    return JSON.parse(completion)
  } catch (error) {
    logger.error(error, '>> movieMashupGenerator error')
  }

  throw new Error('Failed to generate movie mashup')
}
