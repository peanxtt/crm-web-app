import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Loading from '../../components/Loading'

const Home: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/contacts')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Loading />
}

export default Home
