import { useState } from 'react';
import { NoticesAddModalPage1 } from 'components/NoticesAddModalPage1/NoticesAddModalPage1';
import { NoticesAddModalPage2 } from 'components/NoticesAddModalPage2/NoticesAddModalPage2';
import { Backdrop } from './NoticesAddModal.styled';
import { useDispatch } from 'react-redux';
import { postNewNotice } from 'redux/Notice/notice-operations';

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
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [breed, setBreed] = useState('');
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

  console.log(nextPageOpen);

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    const { breed, date, name, title } = data;
    if (breed && date && name && title) {
      handleNextPage();
    } else {
      setNextPageOpen(false);
    }
  };

  const onError = e => {
    console.log(e);
    // const arr = ['title', 'name', 'date', 'breed'];
    // arr.map(item => notify(e[item]?.message));
  };

  const handleChangeParameter = e => {
    if (e.target.id === 'titleInput') {
      setTitle(e.target.value);
    }
    if (e.target.id === 'nameInput') {
      setName(e.target.value);
    }
    if (e.target.id === 'birthInput') {
      setBirthday(convertDate(e.target.value));
    }
    if (e.target.id === 'breedInput') {
      setBreed(e.target.value);
    }
  };

  const convertDate = date => {
    if (!date?.length) return;
    const d = date?.split('-');

    return ([d[0], d[1], d[2]] = [d[2], d[1], d[0]].join('.'));
  };

  const createPet = async e => {
    e.preventDefault();
    const formData = new FormData();
    const secondPage = new FormData(e.target);
    const {
      sexMale,
      sexFemle,
      locationInput: location,
      priceInput: price,
      fileInput,
      comments,
    } = Object.fromEntries(secondPage.entries());

    formData.append('avatar', fileInput);
    formData.append(
      'notice',
      JSON.stringify({
        title,
        name,
        birthday,
        breed,
        category,
        sex: sexMale || sexFemle,
        location,
        price,
        comments,
      })
    );

    const result = await dispatch(postNewNotice(formData));
    if (result.type === 'notices/new/fulfilled') {
      document.querySelector('body').classList.remove('modal');
      setIsModalOpen(false);
    }
    if (result.type === 'notices/new/rejected') {
      // toast.info('Something wrong');
    }
  };

  const handleChoiseCategory = e => {
    if (e.target.id === 'lostFound') {
      setCategory('lostFound');
      document.querySelector('#lostFound').classList.add('active');
      document.querySelector('#inGoodHands').classList.remove('active');
      document.querySelector('#sell').classList.remove('active');
    }
    if (e.target.id === 'inGoodHands') {
      setCategory('inGoodHands');
      document.querySelector('#lostFound').classList.remove('active');
      document.querySelector('#inGoodHands').classList.add('active');
      document.querySelector('#sell').classList.remove('active');
    }
    if (e.target.id === 'sell') {
      setCategory('sell');
      document.querySelector('#lostFound').classList.remove('active');
      document.querySelector('#inGoodHands').classList.remove('active');
      document.querySelector('#sell').classList.add('active');
    }
  };

  const handleBtnCLoseModal = () => {
    setIsModalOpen(false);
    document.querySelector('body').classList.remove('modal');
  };

  const handleNextPage = () => {
    if (category !== '') {
      setNextPageOpen(true);
      document.querySelector('#mainPageModal').classList.add('hidden');
      if (nextPageOpen) {
        document.querySelector('#secondPageModal').classList.remove('hidden');
      }
    } else if (category === '') {
      notify('Category must be set');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Backdrop onClick={handleBackdropClose}>
        <NoticesAddModalPage1
          register={register}
          pet={pet}
          setPet={setPet}
          handleBtnCLoseModal={handleBtnCLoseModal}
          handleChoiseCategory={handleChoiseCategory}
          handleChangeParameter={handleChangeParameter}
        />

        {nextPageOpen && (
          <NoticesAddModalPage2
            register={register}
            pet={pet}
            setPet={setPet}
            nextPageOpen={nextPageOpen}
            setIsModalOpen={setIsModalOpen}
            setNextPageOpen={setNextPageOpen}
            handleBtnCLoseModal={handleBtnCLoseModal}
            category={category}
            title={title}
            name={name}
            birthday={birthday}
            breed={breed}
          />
        )}
      </Backdrop>
    </form>
  );
};
