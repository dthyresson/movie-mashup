import fs from 'fs'
import path from 'path'

import { db } from 'api/src/lib/db'
import { parse } from 'json2csv'

import { getPaths } from '@redwoodjs/project-config'

export default async () => {
  try {
    // Fetch all stories from the database
    const movieMashups = await db.movieMashup.findMany({
      include: {
        firstMovie: true,
        secondMovie: true,
      },
    })

    // Prepare the data for CSV export
    const csvData = movieMashups.map((mashup) => ({
      id: mashup.id,
      title: mashup.title,
      tagline: mashup.tagline,
      treatment: mashup.treatment,
      description: mashup.description,
      photo: mashup.photo,
      firstMovieId: mashup.firstMovie.id,
      firstMovieTitle: mashup.firstMovie.title,
      secondMovieId: mashup.secondMovie.id,
      secondMovieTitle: mashup.secondMovie.title,
    }))

    // Convert the data to CSV format
    const csv = parse(csvData)

    // Generate a filename with the current timestamp (without milliseconds)
    const filename = `movie_mashups_export_${new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/:/g, '-')}.csv`

    // Write the CSV file
    const filePath = path.join(getPaths().base, 'exports', filename)
    fs.writeFileSync(filePath, csv)

    console.log(`Movie mashups exported successfully to ${filePath}`)
  } catch (error) {
    console.error('Error exporting movie mashups:', error)
  } finally {
    await db.$disconnect()
  }
}
