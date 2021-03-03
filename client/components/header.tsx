import Link from 'next/link';
const HeaderComponent = ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Signup', href: '/auth/signup' },
    !currentUser && { label: 'Signin', href: '/auth/signin' },
    currentUser && { label: 'Signout', href: '/auth/signout' },
  ]
    .filter((link) => link)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href}>
            <a className="nav-link">{label}</a>
          </Link>
        </li>
      );
    });
  return (
    <nav className="navbar navbar-light bg-ligh">
      <Link href="/">
        <a className="navbar-brand">Tickety</a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};

export default HeaderComponent;
