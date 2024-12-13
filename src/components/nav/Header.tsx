import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/User";
import ToggleTheme from "./ToggleTheme";

const Header = () => {

  const { isAuthentified, logout, loading, userName } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  }

  return (
    <header className="navbar bg-base-100">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">Skyjo d'Olivier</Link>
      </div>
      <nav className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><NavLink to={'/'}>Accueil</NavLink></li>
          {loading ? (
            <li><span className="loading loading-ring loading-md"></span></li>
          ) : (
            isAuthentified ? (
              <>
                <li className="flex justify-center items-center mx-3">Bonjour {userName}</li>
                <li><button onClick={handleLogout}>Déconnexion</button></li>
              </>
            ) : (
              <>
                <li><Link to={'/auth/login'}>Connexion</Link></li>
                <li><Link to={'/auth/register'}>Créer un compte</Link></li>
              </>
            )
          )}
        </ul>
        {/* <button className="btn ml-4" onClick={toggleTheme}>
          {theme === 'light' ? '🌞' : '🌙'}
        </button> */}
        <ToggleTheme />
      </nav>
    </header>
  )
}

export default Header