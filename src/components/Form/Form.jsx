import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useDispatch, useSelector } from 'react-redux';
import { getPhoneBookValue } from '../../redux/phoneBookSlice';
import { FormStyle } from './Form.styled';
import { InputStyle, LabelStyle, ButtonStyle } from 'components/App.styled';
import { postContactThunk } from '../../redux/services/fetchContacts';

export const options = {
  width: '400px',
  position: 'center-center',
  timeout: 3000,
  fontSize: '20px',
};

export const Form = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const phoneBook = useSelector(getPhoneBookValue);

  const onSubmitAddContact = event => {
    event.preventDefault();
    const newObj = { name, number };

    if (isNameNew(phoneBook, newObj) !== undefined) {
      Notify.warning(`${newObj.name} is already in contacts`, options);
      return;
    }

    dispatch(postContactThunk(newObj));

    reset();
  };

  const isNameNew = (phoneBook, newObj) => {
    return phoneBook.find(
      ({ name }) => name.toLowerCase() === newObj.name.toLowerCase()
    );
  };

  const onChangeInput = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <FormStyle onSubmit={onSubmitAddContact}>
      <LabelStyle>
        Name:
        <InputStyle
          type="text"
          name="name"
          value={name}
          required
          onChange={onChangeInput}
        />
      </LabelStyle>
      <LabelStyle>
        Phone number:
        <InputStyle
          type="tel"
          name="number"
          value={number}
          required
          onChange={onChangeInput}
        />
      </LabelStyle>
      <ButtonStyle type="submit">Add contact</ButtonStyle>
    </FormStyle>
  );
};
