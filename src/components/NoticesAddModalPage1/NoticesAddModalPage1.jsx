import { useState } from 'react';

import {
  Modal,
  IconClose,
  ModalTitle,
  ModalTitleInfo,
  CategoryList,
  CategoryBtn,
  ParameterList,
  ParameterTitle,
  ParameterInput,
  ControlsBtnList,
  ControlsBtn,
  CategoryInput,
} from './NoticesAddModalPage1.styled';

export const NoticesAddModalPage1 = ({
  handleBtnCLoseModal,
  register,
  setValue,
}) => {
  const [isActive, setIsActive] = useState('');

  function changeButtonStatus(status) {
    setIsActive(status);
  }

  return (
    <Modal id="mainPageModal">
      <IconClose onClick={handleBtnCLoseModal} />
      <ModalTitle>Add pet</ModalTitle>
      <ModalTitleInfo>
        Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet,
        consectetur
      </ModalTitleInfo>

      <CategoryList>
        <li>
          <CategoryBtn
            onClick={() => {
              setValue('category', 'lostFound');
              changeButtonStatus('lostFound');
            }}
            type="button"
            className={isActive === 'lostFound' && 'active'}
          >
            lost/found
          </CategoryBtn>
        </li>
        <li>
          <CategoryBtn
            onClick={() => {
              setValue('category', 'inGoodHands');
              changeButtonStatus('inGoodHands');
            }}
            type="button"
            className={isActive === 'inGoodHands' && 'active'}
          >
            in good hands
          </CategoryBtn>
        </li>
        <li>
          <CategoryBtn
            onClick={() => {
              setValue('category', 'sell');
              changeButtonStatus('sell');
            }}
            type="button"
            className={isActive === 'sell' && 'active'}
          >
            sell
          </CategoryBtn>
        </li>
        <CategoryInput {...register('category')} />
      </CategoryList>
      <ParameterList>
        <li>
          <ParameterTitle>
            Tittle of ad<span>*</span>
          </ParameterTitle>
          <ParameterInput
            {...register('title')}
            type="text"
            placeholder="Type title"
          />
        </li>
        <li>
          <ParameterTitle>
            Name pet<span>*</span>
          </ParameterTitle>
          <ParameterInput
            {...register('name')}
            type="text"
            placeholder="Type name pet"
          />
        </li>
        <li>
          <ParameterTitle>
            Date of birth<span>*</span>
          </ParameterTitle>
          <ParameterInput
            {...register('date')}
            type="date"
            placeholder="Type date of birth"
          />
        </li>
        <li>
          <ParameterTitle>
            Breed<span>*</span>
          </ParameterTitle>
          <ParameterInput type="text" id="breedInput" {...register('breed')} />
        </li>
      </ParameterList>
      <ControlsBtnList>
        <li>
          <ControlsBtn type="button" onClick={handleBtnCLoseModal}>
            Cancel
          </ControlsBtn>
        </li>
        <li>
          <ControlsBtn type="submit">Next</ControlsBtn>
        </li>
      </ControlsBtnList>
    </Modal>
  );
};
