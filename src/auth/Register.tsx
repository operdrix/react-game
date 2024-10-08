import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import CustomField from '../components/CustomField';

function Register() {

  const [initialValues] = useState({
    firstname: "",
    lastname: "",
    pseudo: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const validationSchema = yup.object().shape({
    firstname: yup.string().required("Le prénom est requis"),
    lastname: yup.string().required("Le nom est requis"),
    pseudo: yup.string().required("Le pseudo est requis"),
    email: yup.string().email().required("L'email est requis"),
    password: yup.string().required("Le mot de passe est requis"),
    passwordConfirm: yup.string()
      .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas")
      .required("La confirmation du mot de passe est requise"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form values", values);
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <h1 className="font-bold text-center text-2xl mb-5">S'inscrire au jeu</h1>
          <div className="bg-base-200 shadow w-full rounded-lg divide-y divide-base-100">
            <div className="px-5 py-7">
              <Field component={CustomField} name="firstname" label="Prénom" type='text' />
              <Field component={CustomField} name="lastname" label="Nom" type='text' />
              <Field component={CustomField} name="pseudo" label="Pseudo" type='text' />
              <Field component={CustomField} name="email" label="E-mail" type='text' />
              <Field component={CustomField} name="password" label="Mot de passe" type='password' />
              <Field component={CustomField} name="passwordConfirm" label="Confirmer le mot de passe" type='password' />

              <button
                type="submit"
                className="btn btn-primary w-full py-2.5 text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Créer mon compte</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

            </div>
            <div className="py-5">
              <div className="grid grid-cols-2 gap-1">
                <div className="text-center sm:text-left whitespace-nowrap">
                  <Link
                    to={'/auth/login'}
                    className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                    </svg>
                    <span className="inline-block ml-1">Déjà un compte ? Me connecter</span>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </Form>
      </Formik>

      <div className="py-5">
        <div className="grid grid-cols-2 gap-1">
          <div className="text-center sm:text-left whitespace-nowrap">
            <Link
              to={'/'}
              className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="inline-block ml-1">Retour à l'accueil</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;