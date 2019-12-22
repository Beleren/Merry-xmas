// Render Prop
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import './App.scss'

const App = () => (
  <div>
    <h1>Any place in your app!</h1>
    <Formik
      initialValues={{ email: '', search: '', interval: '' }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .required('Please fill the email field')
          .email('This is not a valid email address!'),
        search: Yup.string()
          .max(50, 'Search text is too long!')
          .required('Please fill the search field'),
        interval: Yup.number()
          .min(120)
          .max(1800)
          .required('Please choose an interval to send email'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
      }}
    >
      {({ isSubmitting, handleChange, handleBlur, values }) => (
        <Form>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="text" name="search" />
          <ErrorMessage name="search" component="div" />
          <select
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
          </select>
          <ErrorMessage name="interval" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
)

export default App
