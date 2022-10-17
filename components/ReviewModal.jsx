import { useState } from 'react';
import ReactStars from 'react-rating-stars-component'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const ReviewModal = ({ addReview, setAddReviewModal }) => {
  const initialValues = { name: '', review: '', rating: 0 }

  const [formValues, setFormValues] = useState(initialValues)

  const handleChange = (e) => {
    setFormValues({...formValues, rating : e });
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("⚠️ Required"),
    review: Yup.string().required('⚠️ Required'),
    rating: Yup.number().test('is-num-1-5', '⚠️ Rating must be between 1 and 5', () => {
      const rating = formValues.rating
      return rating >= 1 && rating <= 5;
    })
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) => {
        addReview(values.name, values.review, formValues.rating)
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className='h-fit fixed top-0 bottom-0 left-0 right-0 z-10 flex flex-col w-1/3 px-5 py-5 m-auto bg-white'>
        <button type='button' onClick={() => setAddReviewModal(false)} className='right-5 top-2 absolute'>X</button>
        <div className="flex flex-col w-full m-auto">
          <label className='mb-2 text-[rgba(0,0,0,.87)]' htmlFor="name">Name</label>
          <Field className='outline text-[#000000b0] outline-1 outline-blue-200 px-2 py-2 rounded-md' name="name" />
          <ErrorMessage className='mt-1 font-bold text-red-700' name="name" component="div" />
        </div>
        <div className="flex flex-col w-full m-auto my-5">
          <label className='mb-2 text-[rgba(0,0,0,.87)]' htmlFor="review">Review</label>
          <Field className='outline text-[#000000b0] outline-1 outline-blue-200 px-2 py-2 rounded-md' as='textarea'  name="review" />
          <ErrorMessage className='mt-1 font-bold text-red-700' name="review" component="div" />
        </div>
        <div className="flex flex-col w-full m-auto">
          <label className='mb-2 text-[rgba(0,0,0,.87)]' htmlFor="rating">Rating</label>
          <ReactStars
            name="rating"
            id="rating"
            count={5}
            value={formValues.rating}
            onChange={handleChange}
            size={24}
            activeColor="#86e1ff"
          />
          <ErrorMessage className='mt-1 font-bold text-red-700' name="rating" component="div" />
        </div>
        <div className='m-auto mt-5'>
          <button disabled={isSubmitting} type='submit' className='bg-[#8cd0e3] transition-all duration-300 text-white w-fit px-4 py-2 hover:shadow-[3px_3px_0_#f5ea77]' >Submit</button>
        </div>
        </Form>
      )}
    </Formik>
  )
}

export default ReviewModal