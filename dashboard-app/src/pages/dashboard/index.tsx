import CreateShortUrl from "@components/short-url/create"
import ShortUrlList from "@components/short-url/list"

function Dashboard() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          Your Links
        </h1>
        <p className="text-sm">
          Manage and track your shortened destinations
        </p>
      </div>
      <ShortUrlList />
      <CreateShortUrl />
    </div>
  )
}

export default Dashboard