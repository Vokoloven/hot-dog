import axios from 'axios';
import { RegisterButtonLocation } from 'components/RegisterForm/RegisterForm.styled';
import { LOCATIONWRAPPER } from 'components/User/UserCard/UserInfo/UserInfo.styled';
import { useMemo, useState } from 'react';

import {
  NextPageModal,
  ModalTitle,
  IconClose,
  SecondPageParameterList,
  ParameterTitle,
  SexList,
  SexItem,
  MaleIcon,
  SexInput,
  SexText,
  FemaleIcon,
  ParameterItem,
  SecondPageParameterInput,
  AvatarInputBox,
  IconPlus,
  AvatarInput,
  TextArea,
  ControlsBtnList,
  ControlsBtn,
  PreviewImg,
  LocationListWrapper,
  NoticeLOcation,
  BothSexInput,
} from './NoticesAddModalPage2.styled';

export const NoticesAddModalPage2 = ({
  handleBtnCLoseModal,
  nextPageOpen,
  register,
  setNextPageOpen,
  setValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notFoundCity, setNotFoundCity] = useState(false);
  const [arrayLocation, setArrayLocation] = useState('');
  const [location, setLocation] = useState('');
  const [chooseAvatar] = useState(false);
  const [sex, setSex] = useState('');

  const fetchProducts = useMemo(
    () => async search => {
      if (!search) return;
      try {
        const response = await axios.get(
          `https://petssupportapi.onrender.com/location?city=${search}`
        );
        if (response?.data?.cities.length === 0) {
          setNotFoundCity(true);
          setArrayLocation(false);
          return;
        }

        setArrayLocation(response?.data?.cities);
        setNotFoundCity(false);
      } catch (error) {
        console.log(error.message);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [arrayLocation]
  );

  const handleLocationSet = e => {
    const { value } = e.target;
    const query = value.trim();
    setLocation(query);
    setIsOpen(true);
    if (query) fetchProducts(query);
    if (!location) {
      setArrayLocation(false);
      setNotFoundCity(true);
      return;
    }
  };

  const handleToBackPage = () => {
    if (nextPageOpen) {
      document.querySelector('#secondPageModal').classList.add('hidden');
    }
    setNextPageOpen(false);
    document.querySelector('#mainPageModal').classList.remove('hidden');
  };

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

  const handleButtonClick = e => {
    setLocation(e.currentTarget.innerText);
    setValue('location', e.currentTarget.innerText);
    setIsOpen(false);
  };

  return (
    <NextPageModal id="secondPageModal">
      <ModalTitle>Add pet</ModalTitle>
      <IconClose onClick={handleBtnCLoseModal} />
      <SecondPageParameterList>
        <li>
          <ParameterTitle>
            The sex<span style={{ color: '#F59256' }}>*</span>:
          </ParameterTitle>
          <SexList style={{ display: 'flex' }}>
            <SexItem onClick={() => setSex('male')}>
              <MaleIcon />
              <SexInput
                id="male"
                type="button"
                onClick={() => setValue('sex', 'male')}
              />
              <SexText className={sex === 'male' ? 'active' : 'disabled'}>
                Male
              </SexText>
            </SexItem>
            <SexItem onClick={() => setSex('female')}>
              <FemaleIcon />
              <SexInput
                id="male"
                type="button"
                onClick={() => setValue('sex', 'female')}
              />
              <SexText className={sex === 'female' ? 'active' : 'disabled'}>
                Female
              </SexText>
            </SexItem>
            <BothSexInput {...register('sex')} />
          </SexList>
        </li>
        <LOCATIONWRAPPER>
          <ParameterItem>
            <ParameterTitle>
              Location<span style={{ color: '#F59256' }}>*</span>:
            </ParameterTitle>

            <SecondPageParameterInput
              {...register('location')}
              onChange={handleLocationSet}
              type="text"
              id="locationInput"
              placeholder="Type pet location"
            />
          </ParameterItem>
          <LocationListWrapper>
            {arrayLocation && isOpen && (
              <NoticeLOcation>
                {arrayLocation?.map((locate, index) => (
                  <li key={index}>
                    <RegisterButtonLocation
                      type="button"
                      onClick={handleButtonClick}
                    >
                      <span>{locate.name}</span>
                      {',  '}
                      <span>{locate.regionArea}</span>
                    </RegisterButtonLocation>
                  </li>
                ))}
              </NoticeLOcation>
            )}
            {isOpen && notFoundCity && !arrayLocation && (
              <NoticeLOcation>
                <li>
                  <RegisterButtonLocation type="button">
                    There is no such city, try another
                  </RegisterButtonLocation>
                </li>
              </NoticeLOcation>
            )}
          </LocationListWrapper>
        </LOCATIONWRAPPER>
        <ParameterItem>
          <ParameterTitle>
            Price<span style={{ color: '#F59256' }}>*</span>:
          </ParameterTitle>
          <SecondPageParameterInput
            {...register('price')}
            type="number"
            placeholder="Type pet price"
          />
        </ParameterItem>
        <ParameterItem>
          <ParameterTitle>Load the pet’s image</ParameterTitle>
          <AvatarInputBox>
            <IconPlus />
            <AvatarInput
              {...register('avatar')}
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
        </ParameterItem>
        <ParameterItem>
          <ParameterTitle>Comments</ParameterTitle>
          <TextArea {...register('comments')}></TextArea>
        </ParameterItem>
      </SecondPageParameterList>

      <ControlsBtnList>
        <ParameterItem>
          <ControlsBtn type="submit" disabled={isOpen ? true : false}>
            Done
          </ControlsBtn>
        </ParameterItem>
        <ParameterItem>
          <ControlsBtn type="button" onClick={handleToBackPage}>
            Back
          </ControlsBtn>
        </ParameterItem>
      </ControlsBtnList>
    </NextPageModal>
  );
};
