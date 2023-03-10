import regExp from './regExp';
import * as yup from 'yup';
import { parseDateString } from './datefns';
import { date } from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const today = new Date();

export const notify = e =>
  toast.error(e, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });

export const schemaUserPageModalFirstPage = yup
  .object()
  .shape({
    category: yup
      .string('lostFound', 'inGoodHands', 'sell')
      .required('Please choose the category'),
    title: yup
      .string()
      .matches(regExp.commentRegExp, 'Please fill the title field')
      .min(2)
      .max(48)
      .required(),
    name: yup
      .string()
      .matches(regExp.commentRegExp, 'Please fill the name field')
      .min(2)
      .max(16),
    date: date('dd.mm.yyyy')
      .typeError('Date should be: dd.mm.yyyy')
      .transform(parseDateString)
      .max(today),
    breed: yup
      .string()
      .matches(regExp.commentRegExp, 'Please fill the breed field')
      .min(2)
      .max(24),
  })
  .required();

export const schemaUserPageModalSecondPage = yup
  .object()
  .shape({
    location: yup.string().required(),
    price: yup.string().min(1).required(),
    comments: yup
      .string()
      .matches(regExp.commentRegExp, 'Please fill the comments field')
      .min(8)
      .max(120)
      .required(),
    sex: yup
      .string('male', 'female')
      .required('Please choose the sex of your pet'),
    avatar: yup
      .mixed()
      .required()
      .test('name', 'You should provide the file', value => {
        if (value?.length === 0) {
          return false;
        } else {
          return true;
        }
      })
      .test('size', 'The file size should be no more than 5Mb', value => {
        if (value?.length === 0) {
          return false;
        }

        return value && value[0].size <= 5000000;
      })
      .test('type', 'We only support jpeg or png', value => {
        if (!value) {
          return;
        }
        if (value?.length === 0) {
          return false;
        }
        return (
          (value && value[0].type === 'image/jpeg') ||
          value[0].type === 'image/png'
        );
      }),
  })
  .required();

export const schemaUserModalAddPetFirstPage = yup
  .object()
  .shape({
    name: yup
      .string()
      .matches(regExp.commentRegExp, 'Please fill the name field')
      .min(2)
      .max(16),
    date: date('dd.mm.yyyy')
      .typeError('Date should be: dd.mm.yyyy')
      .transform(parseDateString)
      .max(today),
    breed: yup
      .string()
      .matches(regExp.commentRegExp, 'Please fill the breed field')
      .min(2)
      .max(24),
  })
  .required();

export const schemaUserModalAddPetSecondPage = yup.object().shape({
  avatar: yup
    .mixed()
    .required()
    .test('name', 'You should provide the file', value => {
      if (value?.length === 0) {
        return false;
      } else {
        return true;
      }
    })
    .test('size', 'The file size should be no more than 5Mb', value => {
      if (value?.length === 0) {
        return false;
      }

      return value && value[0].size <= 5000000;
    })
    .test('type', 'We only support jpeg or png', value => {
      if (!value) {
        return;
      }
      if (value?.length === 0) {
        return false;
      }
      return (
        (value && value[0].type === 'image/jpeg') ||
        value[0].type === 'image/png'
      );
    }),
  comments: yup
    .string()
    .matches(regExp.commentRegExp, 'Please fill the comments field')
    .min(8)
    .max(120)
    .required(),
});
