import { useRouter } from "next/navigation";
import Link from "next/link";
import nookies from "nookies";

import constants from "@/constants";

import { Button } from "@/components/common/Button";
import { ProfileButton } from "@/components/common/ProfileButton";

import styles from "./styles.module.css";

type NavBarProps = {
  pageTitle?: string;
  email?: string;
};

export function Navbar({ pageTitle, email }: NavBarProps) {
  const { push, back } = useRouter();

  const handleNavigateToLogin = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    push('/login');
  };

  const handleNavigateToRegister = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    push('/register');
  };

  const handleNavigateToProfile = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    push("/profile");
  };

  const handleNavigateGoBack = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    back();
  };

  const handleLogout = async (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    nookies.destroy(null, constants.USER_EMAIL);
    nookies.destroy(null, constants.USER_PROFILE);
    nookies.destroy(null, constants.USER_PROFILE_TYPE);
    nookies.destroy(null, constants.USER_TOKEN);
    nookies.destroy(null, constants.USER_REFRESH_TOKEN);

    push('/');
  };

  return (
    <div className={styles.container}>
      {(pageTitle !== '/dashboard' && pageTitle !== '/teacher' && pageTitle !== '/profile' && pageTitle !== '/create-group' && pageTitle !== '/group-details' && pageTitle !== '/verify' && pageTitle !== '/student') && (
        <Link href="/">
          <h2 className={styles.logo}>
            SGTG
          </h2>
        </Link>
      )}

      {(pageTitle === '/verify' || pageTitle === '/student' || pageTitle === '/dashboard') && (
        <h4 className={styles.welcome}>Bem vindo(a), {email}</h4>
      )}

      {(pageTitle === '/profile' || pageTitle === '/teacher' || pageTitle === '/create-group' || pageTitle === '/group-details') && (
        <div className={styles.buttonContainer}>
          <Button
            variant="outline"
            onClick={handleNavigateGoBack}
          >
            Voltar
          </Button>
        </div>
      )}

      {(pageTitle === '/verify' || pageTitle === '/student' || pageTitle === '/confirm') && (
        <div className={styles.buttonContainer}>
          <Button
            variant="outline"
            onClick={handleLogout}
          >
            Sair
          </Button>
        </div>
      )}

      {(pageTitle === '/home' || pageTitle === '/login' || pageTitle === '/register') && (
        <ul className={styles.nav}>
          <>
            {pageTitle !== '/login' && (
              <li>
                <Button
                  variant="outline"
                  onClick={handleNavigateToLogin}
                >
                  Login
                </Button>
              </li>
            )}
            {pageTitle !== '/register' && (
              <li>
                <Button
                  variant="outline"
                  onClick={handleNavigateToRegister}
                >
                  Cadastrar
                </Button>
              </li>
            )}
          </>
        </ul>
      )}

      {pageTitle === '/dashboard' && (
        <ProfileButton onClick={handleNavigateToProfile} />
      )}
    </div>
  );
}