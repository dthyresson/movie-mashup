// To access your database
// Append api/* to import from api and web/* to import from web
import { db } from 'api/src/lib/db'
import { getDMMF, getSchema } from '@prisma/internals'

export default async ({ args }) => {
  const name = args.name || 'MovieMashup'
  const datamodel = await getSchema('api/db/schema.prisma')
  const dmmf = await getDMMF({ datamodel })
  const model = dmmf.datamodel.models.find((model) => model.name === name)
  console.log(name, JSON.stringify(model, null, 2))
}
