import { useState } from 'react';
import { NoticesAddModalPage1 } from 'components/NoticesAddModalPage1/NoticesAddModalPage1';
import { NoticesAddModalPage2 } from 'components/NoticesAddModalPage2/NoticesAddModalPage2';
import { Backdrop } from './NoticesAddModal.styled';
import { useDispatch } from 'react-redux';
import { postNewNotice } from 'redux/Notice/notice-operations';
import { format } from 'date-fns';

import { useForm } from 'react-hook-form';
import {
  schemaUserPageModalFirstPage,
  schemaUserPageModalSecondPage,
  notify,
} from 'helpers/validator/validationInputs';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';

export const NoticesAddModal = ({
  handleBackdropClose,
  setIsModalOpen,
  pet,
  setPet,
}) => {
  const dispatch = useDispatch();
  const [nextPageOpen, setNextPageOpen] = useState(false);
  const [schema, setSchema] = useState('');

  useEffect(() => {
    if (!nextPageOpen) {
      setSchema(schemaUserPageModalFirstPage);
    } else if (nextPageOpen) {
      setSchema(schemaUserPageModalSecondPage);
    }
  }, [nextPageOpen]);

  const { register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      sex: '',
      location: '',
      category: '',
    },
  });

  const onSubmit = async data => {
    const {
      category,
      breed,
      date,
      name,
      title,
      location,
      price,
      comments,
      sex,
      avatar,
    } = data;
    if (category && breed && date && name && title) {
      handleNextPage();
    } else {
      setNextPageOpen(false);
    }
    if (location && price && comments && avatar && sex) {
      const birthday = format(new Date(2020 - 12 - 20), 'dd.MM.yyyy');

      const notice = {
        category,
        breed,
        birthday,
        name,
        title,
        location,
        price,
        comments,
        sex,
      };

      const formData = new FormData();
      formData.append('avatar', avatar[0]);
      formData.append('notice', JSON.stringify(notice));

      const result = await dispatch(postNewNotice(formData));

      if (result.type === 'notices/new/fulfilled') {
        document.querySelector('body').classList.remove('modal');
        setIsModalOpen(false);
      }
      if (result.type === 'notices/new/rejected') {
      }
    }
  };

  const onError = e => {
    console.log(e);
    const arr = [
      'category',
      'title',
      'name',
      'date',
      'breed',
      'location',
      'price',
      'comments',
      'sex',
      'avatar',
    ];
    arr.map(item => notify(e[item]?.message));
  };

  const handleBtnCLoseModal = () => {
    setIsModalOpen(false);
    document.querySelector('body').classList.remove('modal');
  };

  const handleNextPage = () => {
    setNextPageOpen(true);
    document.querySelector('#mainPageModal').classList.add('hidden');
    if (nextPageOpen) {
      document.querySelector('#secondPageModal').classList.remove('hidden');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Backdrop onClick={handleBackdropClose}>
        <NoticesAddModalPage1
          register={register}
          setValue={setValue}
          pet={pet}
          setPet={setPet}
          handleBtnCLoseModal={handleBtnCLoseModal}
        />

        {nextPageOpen && (
          <NoticesAddModalPage2
            register={register}
            setValue={setValue}
            pet={pet}
            setPet={setPet}
            nextPageOpen={nextPageOpen}
            setIsModalOpen={setIsModalOpen}
            setNextPageOpen={setNextPageOpen}
            handleBtnCLoseModal={handleBtnCLoseModal}
          />
        )}
      </Backdrop>
    </form>
  );
};
