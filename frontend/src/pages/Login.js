import React, { useContext } from 'react'
import "./css/login.css"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import AuthContext from '../context/AuthContext';

export const Login = () => {

  const {setUser} =useContext(AuthContext);
  const validationSchema = Yup.object().shape({
    logemail: Yup.string().email('Invalid email address').required('Required'),
    logpass: Yup.string().required('Password is required'),
  });

  const onSubmit = async (values) => {
    // Handle form submission here
    console.log('Form submitted:', values);
    // const postData = {
    //   email: values.logemail,
    //   password: values.logpass,
    // }
    // const res = await axios.post("http://localhost:8000/api/login",postData)
    // if(res){
    //   console.log(res);
    // }
    setUser({
      email: values.logemail,
      password: values.logpass,
  });
  };

  const validationSchemaSignup = Yup.object().shape({
    signUpName: Yup.string().required('Your Full Name is required'),
    signUpEmail: Yup.string().email('Invalid email address').required('Required'),
    signUpPass: Yup.string().required('Password is required'),
  });

  const onSubmitSignup = async (values) => {
    // Handle form submission here
    console.log('Form submitted:', values);
    const postData = {
      name: values.signUpName,
      email: values.signUpEmail,
      password: values.signUpPass,
    }
    const res = await axios.post("http://localhost:8000/api/register",postData)
    if(res){
      console.log(res);
    }
  };
  return (
    <div className='login'>
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label htmlFor="reg-log" />
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <Formik
                            initialValues={{ logemail: '', logpass: '' }}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                          >
                            {({ errors, touched }) => (
                              <Form className="form">
                                <div className="form-group">
                                  <Field
                                    type="email"
                                    name="logemail"
                                    className={`form-control ${errors.logemail && touched.logemail ? 'is-invalid' : ''}`}
                                    placeholder="Your Email"
                                    id="logemail"
                                    autoComplete="off"
                                    autofocus
                                  />
                                  <i className="input-icon uil uil-at" />
                                  {errors.logemail && touched.logemail && <div className="invalid-feedback">{errors.logemail}</div>}
                                </div>
                                <div className="form-group mt-2">
                                  <Field
                                    type="password"
                                    name="logpass"
                                    className={`form-control ${errors.logpass && touched.logpass ? 'is-invalid' : ''}`}
                                    placeholder="Your Password"
                                    id="logpass"
                                    autoComplete="off"
                                  />
                                  <i className="input-icon uil uil-lock-alt" />
                                  {errors.logpass && touched.logpass && <div className="invalid-feedback">{errors.logpass}</div>}
                                </div>
                                <button type="submit" className="btn btn-primary mt-4">
                                  {'Submit'}
                                </button>
                              </Form>
                            )}
                          </Formik>

                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Sign Up</h4>
                          <Formik
                            initialValues={{ signUpName: '', signUpEmail: '', signUpPass: '' }}
                            validationSchema={validationSchemaSignup}
                            onSubmit={onSubmitSignup}
                          >
                            {({ errors, touched }) => (
                              <Form className="form">
                                <div className="form-group">
                                  <Field
                                    type="text"
                                    name="signUpName"
                                    className={`form-control ${errors.signUpName && touched.signUpName ? 'is-invalid' : ''}`}
                                    placeholder="Your Full Name"
                                    id="signUpName"
                                    autoComplete="off"
                                    autofocus
                                  />
                                  <i className="input-icon uil uil-user" />
                                  {errors.signUpName && touched.signUpName && <div className="invalid-feedback">{errors.signUpName}</div>}
                                </div>
                                <div className="form-group mt-2">
                                  <Field
                                    type="email"
                                    name="signUpEmail"
                                    className={`form-style ${errors.signUpEmail && touched.signUpEmail ? 'is-invalid' : ''}`}
                                    placeholder="Your Email"
                                    id="signUpEmail"
                                    autoComplete="off"
                                  />
                                  <i className="input-icon uil uil-at" />
                                  {errors.signUpEmail && touched.signUpEmail && <div className="invalid-feedback">{errors.signUpEmail}</div>}
                                </div>
                                <div className="form-group mt-2">
                                  <Field
                                    type="password"
                                    name="signUpPass"
                                    className={`form-style ${errors.signUpPass && touched.signUpPass ? 'is-invalid' : ''}`}
                                    placeholder="Your Password"
                                    id="signUpPass"
                                    autoComplete="off"
                                  />
                                  <i className="input-icon uil uil-at" />
                                  {errors.signUpPass && touched.signUpPass && <div className="invalid-feedback">{errors.signUpPass}</div>}
                                </div>
                                <button type="submit" className="btn btn-primary mt-4">
                                  {'Register'}
                                </button>
                              </Form>
                            )}
                          </Formik>




                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
