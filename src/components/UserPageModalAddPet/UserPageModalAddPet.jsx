import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postUserPet } from 'redux/User/user-operation';
import {
  Backdrop,
  ModalMainPage,
  ModalSecondPage,
  IconClose,
  CloseBtn,
  MainPageModalTitle,
  CategoryList,
  CategoryTitle,
  CategoryTitleSecondPage,
  CategoryInput,
  ControlsList,
  ControlsBtn,
  SecondPageModalTitle,
  AvatarInputBox,
  IconPlus,
  AvatarInput,
  CategoryListSecondPage,
  TextArea,
  CategoryCommentsTitle,
  PreviewImg,
} from './UserPageModalAddPet.styled';

import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import {
  schemaUserModalAddPetFirstPage,
  schemaUserModalAddPetSecondPage,
  notify,
} from 'helpers/validator/validationInputs';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';

export const UserPageModalAddPet = ({
  handleBackdropClose,
  setIsModalOpen,
}) => {
  const dispatch = useDispatch();

  const [nextPageOpen, setNextPageOpen] = useState(false);
  const [chooseAvatar, setChooseAvatar] = useState(false);
  const [schema, setSchema] = useState('');

  useEffect(() => {
    if (!nextPageOpen) {
      setSchema(schemaUserModalAddPetFirstPage);
    } else if (nextPageOpen) {
      setSchema(schemaUserModalAddPetSecondPage);
    }
  }, [nextPageOpen]);

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    const { name, date, breed, avatar, comments } = data;

    if (name && date && breed) {
      handleOpenSecondPage();
    }

    if (avatar && comments) {
      const birthday = format(new Date(2020 - 12 - 20), 'dd.MM.yyyy');
      const formData = new FormData();

      const data = {
        name,
        birthday,
        breed,
        comments,
      };

      formData.append('avatar', avatar[0]);
      formData.append('data', JSON.stringify(data));
      const response = await dispatch(postUserPet(formData));
      if (response.meta.requestStatus === 'fulfilled') {
        setIsModalOpen(false);
        document.querySelector('body').classList.remove('modal');
      }
    }
  };

  const onError = e => {
    const arr = ['name', 'date', 'breed', 'avatar', 'comments'];
    arr.map(item => notify(e[item]?.message));
  };

  function handleOpenSecondPage(e) {
    setNextPageOpen(true);
    document
      .querySelector('#userAddOwnPetModalMainPage')
      .classList.add('hidden');
    if (nextPageOpen) {
      document
        .querySelector('#userAddOwnPetModalSecondPage')
        .classList.remove('hidden');
    }
  }

  function previewFile(e) {
    let preview = document.querySelector('#imagePreview');
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = '';
    }
  }

  const handleBackBtn = () => {
    setNextPageOpen(false);
    document
      .querySelector('#userAddOwnPetModalSecondPage')
      .classList.add('hidden');
    document
      .querySelector('#userAddOwnPetModalMainPage')
      .classList.remove('hidden');
  };

  return (
    <Backdrop onClick={handleBackdropClose}>
      <ModalMainPage id="userAddOwnPetModalMainPage">
        <CloseBtn
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          <IconClose />
        </CloseBtn>
        <MainPageModalTitle>Add pet</MainPageModalTitle>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <CategoryList>
            <li>
              <CategoryTitle>Name pet</CategoryTitle>
              <CategoryInput
                type="text"
                placeholder="Type name pet"
                {...register('name')}
              />
            </li>
            <li>
              <CategoryTitle>Date of birth</CategoryTitle>
              <CategoryInput
                type="date"
                {...register('date')}
                placeholder="Type date of birth"
              />
            </li>
            <li>
              <CategoryTitle>Breed</CategoryTitle>
              <CategoryInput
                type="text"
                {...register('breed')}
                placeholder="Type breed"
              />
            </li>
          </CategoryList>
          <ControlsList>
            <li>
              <ControlsBtn type="submit">Next</ControlsBtn>
            </li>
            <li>
              <ControlsBtn
                onClick={e => {
                  e.preventDefault();
                  setIsModalOpen(false);
                  document.querySelector('body').classList.remove('modal');
                }}
              >
                Cancel
              </ControlsBtn>
            </li>
          </ControlsList>
        </form>
      </ModalMainPage>
      {nextPageOpen && (
        <ModalSecondPage id="userAddOwnPetModalSecondPage">
          <CloseBtn
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            <IconClose />
          </CloseBtn>
          <SecondPageModalTitle>Add pet</SecondPageModalTitle>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <CategoryListSecondPage>
              <li style={{ display: 'block', textAlign: 'center' }}>
                <CategoryTitleSecondPage>
                  Add photo and some comments
                </CategoryTitleSecondPage>
                <AvatarInputBox>
                  <IconPlus />
                  <AvatarInput
                    {...register('avatar')}
                    onClick={() => {
                      setChooseAvatar(true);
                    }}
                    onChange={previewFile}
                    type="file"
                    id="fileInput"
                  />
                  <PreviewImg
                    style={{
                      position: 'absolute',
                      borderRadius: 'inherit',
                      padding: '1px',
                      boxShadow: '0px 0px 4px #f59256',
                      cursor: 'pointer',
                      pointerEvents: 'none',
                    }}
                    chooseAvatar={chooseAvatar}
                    id="imagePreview"
                    src=""
                    alt=""
                  />
                </AvatarInputBox>
              </li>
              <li>
                <CategoryCommentsTitle>Comments</CategoryCommentsTitle>
                <TextArea
                  {...register('comments')}
                  cols="30"
                  rows="10"
                ></TextArea>
              </li>
            </CategoryListSecondPage>
            <ControlsList>
              <li>
                <ControlsBtn type="submit">Done</ControlsBtn>
              </li>
              <li>
                <ControlsBtn onClick={handleBackBtn}>Back</ControlsBtn>
              </li>
            </ControlsList>
          </form>
        </ModalSecondPage>
      )}
    </Backdrop>
  );
};
