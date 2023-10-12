'use client'
import { useRouter } from 'next/router'

export default function Page({ movie }) {

  return (
    <>
      {movie.title}
    </>
  )
}