import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import nookies from "nookies";

import constants from "@/constants";

import { Profile } from "@/types";

import { setupAPIClient } from "@/services/api";

import { withSSRAuth } from "@/utils/withSSRAuth";

import { Navbar } from "@/components/common/Navbar";
import { Button } from "@/components/common/Button";

import styles from "./styles.module.css";

type ProfilePageProps = {
  profileType: string;
  profile: Profile;
};

export default function Profile({ profileType, profile }: ProfilePageProps) {
  const { push } = useRouter();

  const handleLogout = async (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    nookies.destroy(null, constants.USER_EMAIL);
    nookies.destroy(null, constants.USER_PROFILE);
    nookies.destroy(null, constants.USER_PROFILE_TYPE);
    nookies.destroy(null, constants.USER_REFRESH_TOKEN);
    nookies.destroy(null, constants.USER_TOKEN);

    push('/');
  };

  const formatProfileType = (type: string) => {
    switch (type) {
      case "student":
        return "Estudante";
      case "teacher":
        return "Professor";
      case "coordinator":
        return "Coordenador";
      default:
        return "";
    }
  }

  const profileText = formatProfileType(profileType);

  return (
    <>
      <Navbar pageTitle="/profile" />
      <main className="flex flex-col justify-center items-center">
        <div className='flex flex-col w-full max-w-[660px] bg-[#192840] p-12 rounded-md border border-[#fdfafa40] shadow-lg shadow-[#fdfafa40] gap-6'>
          <h2 className='text-white text-3xl font-medium'>Perfil</h2>

          <div className='flex justify-center items-center gap-4'>
            <Image
              src={require('../../assets/images/avatar_placeholder.png')}
              className='w-32 h-32 object-cover rounded-full'
              width={128}
              height={128}
              alt="Avatar"
            />
            <div className='flex flex-col text-white gap-2'>
              <p className='text-2xl'>{profile.user.fullName}</p>
              <p>{profile.user.email}</p>
            </div>
          </div>

          <div className={styles.infoContainer}>
            {profile.user.secondaryEmail && (
              <p>Email Secundário: {profile.user.secondaryEmail}</p>
            )}
            {(profile.user.phone && profile.user.isPhoneVisible) && (
              <p>Telefone: {profile.user.phone}</p>
            )}
            {profileText !== "" && (
              <p>Perfil: {profileText}</p>
            )}
            {profile.user.displayName && (
              <p>Nome de Exibição: {profile.user.displayName}</p>
            )}
            {profile.course && (
              <p>Curso: {profile.course.name}</p>
            )}
            {profile.disciplines?.map(item => (
              <p key={item.id}>Disciplina: {item.name}</p>
            ))}
          </div>

          <div className='flex justify-center items-center mt-6'>
            <div className='w-32'>
              <Button
                variant='secondary'
                onClick={handleLogout}
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth<ProfilePageProps>(async (ctx) => {
  const api = setupAPIClient(ctx);
  const response = await api.get("/profile");

  const {
    profileType,
    profile,
  } = response.data;

  return {
    props: {
      profileType,
      profile,
    }
  }
});