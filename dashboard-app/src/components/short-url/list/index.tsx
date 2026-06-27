import GlobalLoader from '@components/GlobalLoader'
import ShortUrlCard from '@components/short-url/list/Card'
import Button from '@components/base/Button'
import Select from '@components/base/Select'
import Pagination from '@components/base/Pagination'
import useFetchShortUrls from '@hooks/shortUrl/useFetchShortUrls'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@components/ui/input-group'
import { SearchIcon, SortAscIcon, SortDescIcon } from 'lucide-react'

const ITEMS_PER_PAGE_OPTIONS = [
  5,
  10,
  25,
  50,
]

function ShortUrlList() {
  const {
    isLoading,
    data,
    sort,
    page,
    search,
    itemsPerPage,
    totalPages,
    setSearch,
    toggleSort,
    setPage,
    setItemsPerPage,
  } = useFetchShortUrls()

  const SortIcon = sort === 'desc' ? SortAscIcon : SortDescIcon

  return (
    <section className="space-y-4">
      <div className="flex justify-end items-center gap-x-2">
        <InputGroup className="max-w-3xs">
          <InputGroupInput
            placeholder="Search..."
            value={search}
            onChange={({ target }) => setSearch(target.value)} />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>

        <Button
          variant="secondary"
          size="icon"
          loading={isLoading}
          onClick={() => toggleSort()}>
          <SortIcon />
        </Button>
      </div>

      {isLoading ?
        <GlobalLoader /> : (
        <ul className="grid sm:grid-cols-[repeat(auto-fill,minmax(420px,1fr))] gap-4">
          {data?.map((item) => (
            <li key={item.id}>
              <ShortUrlCard {...item} />
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-end items-center gap-x-2">
        <Select
          value={`${itemsPerPage}`}
          options={ITEMS_PER_PAGE_OPTIONS}
          onValueChange={(value) => setItemsPerPage(+value)} />

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={value => setPage(value)} />
      </div>
    </section>
  )
}

export default ShortUrlList
