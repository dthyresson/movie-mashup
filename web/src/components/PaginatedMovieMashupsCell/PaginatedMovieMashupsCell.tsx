import { useState } from 'react'

import type {
  PaginatedMovieMashupsQuery,
  PaginatedMovieMashupsQueryVariables,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import FailureComponent from 'src/components/FailureComponent'
import LoadingComponent from 'src/components/LoadingComponent'
import MovieMashupCard from 'src/components/MovieMashupsCell/MovieMashupCard'
import { Pagination } from 'src/components/Pagination/Pagination'

export const beforeQuery = (props) => {
  const { page, limit } = props
  return {
    variables: {
      page: page || 1,
      limit: limit || 10,
    },
  }
}

export const QUERY: TypedDocumentNode<
  PaginatedMovieMashupsQuery,
  PaginatedMovieMashupsQueryVariables
> = gql`
  query PaginatedMovieMashupsQuery($page: Int!, $limit: Int!) {
    paginated: paginatedMovieMashups(page: $page, limit: $limit) {
      items {
        id
        title
        tagline
        photos {
          id
          imageUrl
        }
        firstMovie {
          title
        }
        secondMovie {
          title
        }
      }
      limit
      page
      totalPages
      totalItems
    }
  }
`
export const Loading = () => <LoadingComponent />

export const Empty = () => (
  <div className="flex h-[80vh] flex-col items-center justify-center text-center">
    <p className="mb-6 font-movie-title text-2xl">
      Let&apos;s mash some movies!
    </p>
    <Link
      to={routes.newMovieMashup()}
      className="flex items-center px-2 py-1 hover:text-orange-500"
    >
      <span className="mr-2">🎬</span>
      <span className="text-normal font-movie-title md:text-lg lg:text-lg">
        New Mashup!
      </span>
    </Link>
  </div>
)

export const Failure = ({ error }: CellFailureProps) => (
  <FailureComponent error={error} />
)

export const Success = ({
  paginated,
  queryResult,
}: CellSuccessProps<PaginatedMovieMashupsQuery>) => {
  const { items, limit, page, totalPages, totalItems } = paginated
  const { refetch } = queryResult
  const [currentPage, setCurrentPage] = useState(page)
  const [currentLimit, setCurrentLimit] = useState(limit)

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    refetch({
      page: newPage,
      limit: limit,
    })
  }

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(event.target.value, 10)
    setCurrentLimit(newLimit)
    setCurrentPage(1)
    queryResult.refetch({
      page: 1,
      limit: newLimit,
    })
  }

  return (
    <>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        firstLabel="⏮️"
        lastLabel="⏭️"
        previousLabel="⬅️"
        nextLabel="➡️"
        totalItems={totalItems}
        currentLimit={currentLimit}
        handleLimitChange={handleLimitChange}
        handlePageChange={handlePageChange}
        caption="Mashups"
      >
        <div className="grid grid-cols-1 gap-4 pb-4 pt-2 sm:grid-cols-2 md:grid-cols-3 md:px-4 lg:grid-cols-4 ">
          {items.map((item) => (
            <MovieMashupCard key={item.id} movieMashup={item} />
          ))}
        </div>
      </Pagination>
    </>
  )
}
