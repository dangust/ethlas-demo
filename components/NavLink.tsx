import { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { Link } from '.'

export { NavLink }

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  exact: PropTypes.bool,
}

NavLink.defaultProps = {
  exact: false,
}

function NavLink({
  children,
  href,
  exact,
  ...props
}: LinkProps & { children: string; exact?: boolean; className?: string }) {
  const { pathname } = useRouter()
  const isActive = exact ? pathname === href : pathname.startsWith(href as string)

  if (isActive) {
    props.className += ' active'
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}
