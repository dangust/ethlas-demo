import { Link } from '../components'

export default Home

function Home() {
  return (
    <div>
      <h1>Welcome to Ethlas users management</h1>
      <p>
        <Link href="/users">&gt;&gt; Manage Users</Link>
      </p>
    </div>
  )
}
