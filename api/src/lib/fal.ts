import * as fal from '@fal-ai/serverless-client'

import { logger } from 'src/lib/logger'
fal.config({
  // Can also be auto-configured using environment variables:
  credentials: process.env.FAL_KEY,
})

export const generatePhoto = async ({
  description,
  adjective,
  animal,
  color,
}: {
  description: string
  adjective: string
  animal: string
  color: string
}) => {
  const prompt = `
    Illustrate: "${description}". In ${adjective} children's story style. Paint the ${animal} the color ${color}.
  `
  logger.debug(prompt, '>> prompt')

  const falModel = 'flux/schnell'
  // "flux/schnell";
  // "aura-flow";
  // fast-lightning-sdxl
  const options = {
    image_size: 'square',
    num_images: 1,
    num_inference_steps: 6,
    enable_safety_checker: true,
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = await fal.run(`fal-ai/${falModel}`, {
    input: { prompt },
    ...options,
  })
  const url = result.images[0].url

  return url
}
