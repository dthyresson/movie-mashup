# Implement AI Audit Log

Add an audit log to track the AI generated content:

Add when movie mashup is generated.

Example response from Langbase when movie mashup is generated:

```json
{
      "completion": "{\n  \"title\": \"Christine's Big Adventure\",\n  \"tagline\": \"Sometimes the road to freedom is paved with a little madness.\",\n  \"treatment\": \"When a possessed vintage car, Christine, takes her new owner, Pee-wee Herman, on a wild ride across America, they must navigate a series of bizarre adventures while evading sinister forces that want to claim Christine's power. As they encounter quirky characters and surreal challenges, Pee-wee learns to embrace his own eccentricity while Christine grapples with her dark past. Together, they must outsmart a group of car enthusiasts who will stop at nothing to possess the legendary vehicle.\",\n  \"description\": \"In a vibrant roadside diner, Pee-wee Herman stands confidently next to Christine, the gleaming red car with glowing headlights. The backdrop is filled with neon signs and laughter, while a group of quirky characters peeks through the diner windows, their expressions a mix of awe and fear. The scene captures the whimsical yet eerie blend of adventure and horror, embodying the heart of their journey.\"\n}",
      "raw": {
        "id": "chatcmpl-9wq3WGSh8JLnp2WLYG1Ldoe27wIED",
        "object": "chat.completion",
        "created": 1723810154,
        "model": "gpt-4o-mini-2024-07-18",
        "choices": [
          {
            "index": 0,
            "message": {
              "role": "assistant",
              "content": "{\n  \"title\": \"Christine's Big Adventure\",\n  \"tagline\": \"Sometimes the road to freedom is paved with a little madness.\",\n  \"treatment\": \"When a possessed vintage car, Christine, takes her new owner, Pee-wee Herman, on a wild ride across America, they must navigate a series of bizarre adventures while evading sinister forces that want to claim Christine's power. As they encounter quirky characters and surreal challenges, Pee-wee learns to embrace his own eccentricity while Christine grapples with her dark past. Together, they must outsmart a group of car enthusiasts who will stop at nothing to possess the legendary vehicle.\",\n  \"description\": \"In a vibrant roadside diner, Pee-wee Herman stands confidently next to Christine, the gleaming red car with glowing headlights. The backdrop is filled with neon signs and laughter, while a group of quirky characters peeks through the diner windows, their expressions a mix of awe and fear. The scene captures the whimsical yet eerie blend of adventure and horror, embodying the heart of their journey.\"\n}",
              "refusal": null
            },
            "logprobs": null,
            "finish_reason": "stop"
          }
        ],
        "usage": {
          "prompt_tokens": 177,
          "completion_tokens": 215,
          "total_tokens": 392
        },
        "system_fingerprint": "fp_48196bc67a"
      }
    }
```

Add when movie poster is generated.

Example response from fal when movie poster is generated:

  ```json
  {
    "images": [
      {
        "url": "https://fal.media/files/tiger/HxXRuyd3nwks6_Uj2OAxu.jpeg",
        "width": 1024,
        "height": 1024,
        "content_type": "image/jpeg"
      }
    ],
    "timings": {
        "inference": 0.36849027033895254
    },
    "seed": 13466929144953512000,
    "has_nsfw_concepts": [
      false
    ],
    "prompt": "Artistic style of a movie poster with imagery for the movie called \"Sometimes the road to freedom is paved with a little madness.\".\n  Include the title \"Christine's Big Adventure\" and tagline \"Sometimes the road to freedom is paved with a little madness.\" in the poster.\n  Include credits and rating.\n  Scene: In a vibrant roadside diner, Pee-wee Herman stands confidently next to Christine, the gleaming red car with glowing headlights. The backdrop is filled with neon signs and laughter, while a group of quirky characters peeks through the diner windows, their expressions a mix of awe and fear. The scene captures the whimsical yet eerie blend of adventure and horror, embodying the heart of their journey."
  }
```

Tasks

* Design a database schema for the audit log using Prisma
* Create GraphQL API to query the audit log
