import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { submitForm } from '../../redux/actions/formActions'
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
  const items = useSelector(state => state.items.items)
  const dispatch = useDispatch()
  return (
    <Container>
      <XmasTitle>What do you want for Christmas?</XmasTitle>
      <Formik
        initialValues={{
          email: '',
          item: '',
          interval: 0,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .required('Please fill the email field')
            .email('This is not a valid email address!'),
          item: Yup.string()
            .max(50, 'Search text is too long!')
            .required('Please fill the search field'),
          interval: Yup.number()
            .min(120)
            .max(1800)
            .required('Please choose an interval to send email'),
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
      {items.length > 0 && <XmasTitle>Gifts</XmasTitle>}
      <GiftGrid>
        {items.map((item, index) => (
          <div key={index}>
            <img src="/gift-box.svg" width="45px" />
            <p>Item: {item.item}</p>
            <p>Interval: {item.interval / 60} minutes</p>
          </div>
        ))}
      </GiftGrid>
    </Container>
  )
}

export default SubscriptionFormView
