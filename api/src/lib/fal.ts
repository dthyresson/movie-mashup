import * as fal from '@fal-ai/serverless-client'

import { logger } from 'src/lib/logger'

export const generateMovieMashupPosterUrl = async ({
  title,
  tagline,
  treatment,
  description,
}) => {
  logger.info({ title, tagline, treatment, description })

  const prompt = `
    Artistic style of a movie poster with imagery for the movie called ${tagline} scene:

    Scene: ${description}

    Include the title "${title}" and tagline "${tagline}" in the poster.

    Include credits and rating.
    `
  // 'fast-lightning-sdxl'
  // "flux/schnell";
  //"aura-flow"; //
  const model = 'flux/schnell'
  const options = {
    image_size: 'landscape_16_9',
    num_inference_steps: 4,
    num_images: 1,
    enable_safety_checker: true,
  } // flux
  const result = await fal.run(`fal-ai/${model}`, {
    input: { prompt },
    ...options,
  })
  const posterUrl = result['images'][0].url

  return posterUrl
}
