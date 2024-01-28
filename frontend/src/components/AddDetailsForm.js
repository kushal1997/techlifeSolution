import React, { useContext, useEffect, useRef } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "../css/addDetailsForm.css"
import * as Yup from 'yup';
import axios from "axios";
import AuthContext from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const validationSchema = Yup.object({
    name: Yup.string().max(120, 'Must be 120 characters or less').required('Required'),
    address: Yup.string().max(1000, 'Must be 1000 characters or less').required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    website: Yup.string().url('Invalid website format').required('Required'),
    contactPersonName: Yup.string().required('Required'),
    phoneNumber: Yup.string().required('Required'),
});


export const AddDetailsForm = ({ setShowForm }) => {
    const bodyRef = useRef(null);
const {errorHandleLogout}=useContext(AuthContext)

    const onSubmit = async (values,{ resetForm }) => {
        // Handle form submission here

        // console.log('Form submitted:', values);
        const postData = {
            userId: localStorage.getItem("userId"),
            name: values.name,
            address: values.address,
            email: values.email,
            website: values.website,
            contactPerson: values.contactPersonName,
            phoneNumber: values.phoneNumber,
        }
        // console.log(postData)
            let loadingToast;
        try{
            loadingToast = toast.loading("Adding details in progress...");

            const res = await axios.post("http://localhost:8000/api/addDetails", postData)
            if (res.data.success === true) {
                console.log(res);
                toast.success(`${res.data.message}`);
                // setShowForm(false);
                resetForm();
            } else {
                toast.error(`${res.data.message}`)
            }

        } catch(err){
            console.log("Session Timeout", err);
            // errorHandleLogout();
        }finally {
            // Close the loading state
            if (loadingToast) {
              toast.dismiss(loadingToast);
            }
          }
       
    };
    return (
        <div className='rock'>
            <div className="body" ref={bodyRef}>
                <p>Add Your Details
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span id='span' onClick={() => setShowForm(false)}>X</span></p>
                <Formik
                    initialValues={{
                        name: '',
                        address: '',
                        email: '',
                        website: '',
                        contactPersonName: '',
                        phoneNumber: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ values }) => (
                        <Form>
                            <label htmlFor="name">Name:</label>
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                maxLength={120}
                                required
                            />
                            <ErrorMessage name="name" component="div" className="error" />

                            <label htmlFor="address">Address:</label>
                            <Field
                                as="textarea"
                                rows={4}
                                id="address"
                                name="address"
                                maxLength={1000}
                                required
                            />
                            <ErrorMessage name="address" component="div" className="error" />

                            <label htmlFor="email">Email:</label>
                            <Field type="email" id="email" name="email" required />
                            <ErrorMessage name="email" component="div" className="error" />

                            <label htmlFor="website">Website:</label>
                            <Field type="url" id="website" name="website" />
                            <ErrorMessage name="website" component="div" className="error" />
                            <label htmlFor="contactPersonName">Contact Person Name:</label>
                            <Field type="text" id="contactPersonName" name="contactPersonName" required />
                            <ErrorMessage name="contactPersonName" component="div" className="error" />

                            <label htmlFor="phoneNumber">Phone Number:</label>
                            <Field type="tel" id="phoneNumber" name="phoneNumber" required />
                            <ErrorMessage name="phoneNumber" component="div" className="error" />
                            <div className="lowerDiv">
                                <button type="submit" class="button2">
                                    Submit
                                </button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}


