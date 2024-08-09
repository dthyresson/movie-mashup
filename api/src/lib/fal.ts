import * as fal from '@fal-ai/serverless-client'

import { logger } from 'src/lib/logger'

export const generateMovieMashupPosterUrl = async ({
  title,
  tagline,
  treatment,
}) => {
  logger.info({ treatment })

  const prompt = `
    Artistic style of a movie poster with imagery depicting the following movie called ${title} with the following tagline: ${tagline}  :

    ${treatment}
    `
  // 'fast-lightning-sdxl'
  // "flux/schnell";
  //"aura-flow"; //
  const model = 'fast-lightning-sdxl'
  const options = {
    image_size: 'portrait_16_9',
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
