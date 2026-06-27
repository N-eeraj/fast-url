import CreateShortUrl from "@components/short-url/create"
import ShortUrlList from "@components/short-url/list"

function Dashboard() {
  return (
    <div>
      <ShortUrlList />
      <CreateShortUrl />
    </div>
  )
}

export default Dashboard