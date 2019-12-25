import React, { useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { submitForm, fetchItems } from '../../redux/actions/formActions'
import Container from '../Container'
import {
  GiftGrid,
  XmasButton,
  XmasError,
  XmasInput,
  XmasForm,
  XmasSelect,
  XmasTitle,
} from './SubscriptionForm-styles'

const SubscriptionFormView = () => {
  const users = useSelector(state => state.users.users)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchItems())
  }, [])
  return (
    <Container>
      <XmasTitle>What do you want for Christmas?</XmasTitle>
      <Formik
        initialValues={{
          email: '',
          item: '',
          interval: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .required('Please fill the email field')
            .email('This is not a valid email address!'),
          item: Yup.string()
            .required('Please fill the search field')
            .max(50, 'Search text is too long!'),
          interval: Yup.number()
            .required('Please choose an interval to send email')
            .min(120, 'Interval must be greater or equals to 2 minutes')
            .max(1800, 'Interval must be lower or equals to 30 minutes'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await dispatch(submitForm(values))
          setSubmitting(false)
        }}
      >
        {({ isSubmitting, handleChange, handleBlur, values }) => (
          <XmasForm>
            <XmasInput type="email" name="email" placeholder="E-mail" />
            <XmasError name="email" component="div" />
            <XmasInput type="text" name="item" placeholder="Wish Gift" />
            <XmasError name="item" component="div" />
            <XmasSelect
              as="select"
              name="interval"
              value={values.interval}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{ display: 'block' }}
            >
              <option value="" label="Select an interval">
                Select an interval
              </option>
              <option value="120" label="2 minutes">
                2 minutes
              </option>
              <option value="600" label="10 minutes">
                10 minutes
              </option>
              <option value="1800" label="30 minutes">
                30 minutes
              </option>
            </XmasSelect>
            <XmasError name="interval" component="div" />
            <XmasButton type="submit" disabled={isSubmitting}>
              Send to Santa
            </XmasButton>
          </XmasForm>
        )}
      </Formik>
      {users.length > 0 && <XmasTitle>Gifts</XmasTitle>}
      <GiftGrid>
        {users.map(user =>
          user.items.map(item => (
            <div key={item._id}>
              <img src="/gift-box.svg" width="45px" alt="Gift box" />
              <p>Email:{user.email}</p>
              <p>Item: {item.name}</p>
              <p>Interval: {item.interval / 60} minutes</p>
            </div>
          ))
        )}
      </GiftGrid>
    </Container>
  )
}

export default SubscriptionFormView
