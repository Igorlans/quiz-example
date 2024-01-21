import PageTitle from '@/ui/PageTitle/PageTitle';
import React from 'react';
import { Button } from '@/ui';
import { Link } from 'react-router-dom';
import ImageInput from '@/ui/ImageInput/ImageInput';
import { Avatar } from '@/ui';
import { Page } from '@/ui';
import { ProfileInfoField } from './components/ProfileInfoField';
import { useUserStore } from '@/shared/store/userStore';
import { updateAvatar } from './api/updateAvatar';
import './ProfilePage.scss';

const userInfoKeys = ['email', 'tel', 'username'] as const;

const userInfoTranslatedKeys = new Map<typeof userInfoKeys[number], string>();
userInfoTranslatedKeys.set('username', 'ім’я');
userInfoTranslatedKeys.set('email', 'email');
userInfoTranslatedKeys.set('tel', 'тел.');

const ProfilePage = () => {
  const updateStoreAvatar = useUserStore((state) => state.updateAvatar);
  const user = useUserStore((state) => state.user);

  const handleUpdateAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const avatar = await updateAvatar(e.target.files[0]);

    avatar && updateStoreAvatar(avatar);
  };

  return (
    <Page className='profile'>
      <section className='profile__top-section'>
        <div className='profile__info'>
          <PageTitle
            title='Мій аккаунт'
            className='profile__title-container'
          />

          <div className='profile__info-fields'>
            {userInfoKeys.map((key) => {
              if (!user?.[key]) return;

              return (
                <ProfileInfoField
                  key={key}
                  fieldName={userInfoTranslatedKeys.get(key)!}
                  value={user[key] as string}
                />
              );
            })}
          </div>
        </div>

        <div className='profile__avatar-container'>
          <Avatar
            img={user?.avatar}
            className='profile__avatar'
          />

          <ImageInput className='profile__avatar-input' onChange={handleUpdateAvatar} />
        </div>
      </section>

      <Link to='/games'>
        <Button className='mt-10 py-4 px-8 max-w-[260px] min-w-[100px] w-4/5 text-2xl sm:hidden'>
          Створити гру
        </Button>
      </Link>
    </Page>
  );
};

export default ProfilePage;
