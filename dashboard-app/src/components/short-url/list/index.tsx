import GlobalLoader from '@components/GlobalLoader'
import ShortUrlCard from '@components/short-url/list/Card'
import useFetchShortUrls from '@hooks/shortUrl/useFetchShortUrls'

function ShortUrlList() {
  const {
    isLoading,
    data,
  } = useFetchShortUrls()

  if (isLoading) return <GlobalLoader />

  return (
    <ul className="grid sm:grid-cols-[repeat(auto-fill,minmax(420px,1fr))] gap-4">
      {data?.map((item) => (
        <li key={item.id}>
          <ShortUrlCard {...item} />
        </li>
      ))}
    </ul>
  )
}

export default ShortUrlList
