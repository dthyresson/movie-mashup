import * as fal from '@fal-ai/serverless-client'

import { logger } from 'src/lib/logger'

const PHOTO_REALISM_SETTINGS = {
  LOW: 'fast-lightning-sdxl',
  MEDIUM: 'flux/schnell',
  HIGH: 'aura-flow',
  ULTRA: 'flux-realism',
}

export const generateMovieMashupPosterUrl = async ({
  title,
  tagline,
  treatment,
  description,
  realism = 'LOW',
}) => {
  logger.info({ title, tagline, treatment, description })

  const prompt = `
    Artistic style of a movie poster with imagery for the movie called ${tagline} scene:

    Scene: ${description}

    Include the title "${title}" and tagline "${tagline}" in the poster.

    Include credits and rating.
    `

  const falModel = PHOTO_REALISM_SETTINGS[realism]

  logger.info({ falModel })

  if (!falModel) {
    throw new Error('Invalid realism level')
  }

  const options = {
    image_size: 'landscape_16_9',
    num_inference_steps: 4,
    num_images: 1,
    enable_safety_checker: true,
  } // flux
  const result = await fal.run(`fal-ai/${falModel}`, {
    input: { prompt },
    ...options,
  })
  const imageUrl = result['images'][0].url

  return { falModel, imageUrl }
}
