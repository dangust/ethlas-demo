import NextLink, { LinkProps } from 'next/link'
import React from 'react'

export { Link }

function Link({ href, children, ...props }: LinkProps & { children: string; className?: string }) {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  )
}
