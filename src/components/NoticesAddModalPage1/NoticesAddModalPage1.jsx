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
} from './NoticesAddModalPage1.styled';

export const NoticesAddModalPage1 = ({
  handleBtnCLoseModal,
  handleChoiseCategory,
  handleChangeParameter,
  register,
}) => {
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
            id="lostFound"
            onClick={handleChoiseCategory}
            type="button"
          >
            lost/found
          </CategoryBtn>
        </li>
        <li>
          <CategoryBtn
            id="inGoodHands"
            onClick={handleChoiseCategory}
            type="button"
          >
            in good hands
          </CategoryBtn>
        </li>
        <li>
          <CategoryBtn id="sell" onClick={handleChoiseCategory} type="button">
            sell
          </CategoryBtn>
        </li>
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
            // id="titleInput"
            // onChange={handleChangeParameter}
            // minLength={2}
            // maxLength={48}
            // required
            // pattern="^([a-zA-Z]{1}|([a-zA-Z]{1,}['-]?\s{1,}[a-zA-Z])+|\s{1,})+$"
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
            // id="nameInput"
            // onChange={handleChangeParameter}
            // pattern="^[a-zA-Z]+$"
            // minLength={2}
            // maxLength={16}
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
            // id="birthInput"
            // onChange={handleChangeParameter}
          />
        </li>
        <li>
          <ParameterTitle>
            Breed<span>*</span>
          </ParameterTitle>
          <ParameterInput
            type="text"
            id="breedInput"
            {...register('breed')}
            // onChange={handleChangeParameter}
            // placeholder="Type breed"
            // minLength={2}
            // maxLength={24}
            // pattern="^([a-zA-Z]{1}|([a-zA-Z]{1,}['-]?\s{1,}[a-zA-Z])+|\s{1,})+$"
          />
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
