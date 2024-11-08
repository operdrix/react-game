import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from 'yup';
import CustomField from '../components/forms/CustomField';
import Modal, { MessageType } from '../components/Modal';
import { useUser } from '../hooks/User';


function Login() {

  const location = useLocation();
  const [redirect, setRedirect] = useState<string>('/');
  const [locationStateMessage, setLocationStateMessage] = useState<MessageType | null>(null);

  const { login, isAuthenticated, message, loading } = useUser();

  const navigate = useNavigate()

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        navigate(redirect, { state: { message: 'Vous êtes connecté' } });
      }
    }
  }, [loading, isAuthenticated, navigate, redirect]);

  useEffect(() => {
    if (message) {
      if (message.type === 'error') {
        const modal = document.getElementById('error_modal');
        (modal as HTMLDialogElement)?.showModal();
        //resetMessage()
      }
    }
  }, [message]);

  useEffect(() => {
    if (location.state?.message) {
      setLocationStateMessage(location.state.message);
      const modal = document.getElementById('message_modal');
      (modal as HTMLDialogElement)?.showModal();
    }
    if (location.state?.from) {
      setRedirect(location.state.from);
    }
  }, [location]);

  const [initialValues] = useState({
    email: "",
    password: "",
  });

  const validationSchema = yup.object().shape({
    email: yup.string().email().required("L'email est requis"),
    password: yup.string().required("Le mot de passe est requis"),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    setSubmitting(true);
    try {
      const success = await login(values.email, values.password);
      if (success) {
        console.log('Login success');
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setSubmitting(false);
    }
    console.log("Login: Form values", values);
  };

  return (
    <>
      <Modal id="message_modal" title={locationStateMessage?.title || "Succès"} message={locationStateMessage?.message || ''} type={locationStateMessage?.type || 'success'} />
      <Modal id="error_modal" title="Oups ! Il semblerait qu'il y ait un problème" message={message?.text || "Erreur"} type="error" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <h1 className="font-bold text-center text-2xl mb-5">Connexion au jeu</h1>
            <div className="bg-base-200 shadow w-full rounded-lg divide-y divide-base-100">
              <div className="px-5 py-7">
                <Field component={CustomField} name="email" label="E-mail" type='text' />
                <Field component={CustomField} name="password" label="Mot de passe" type='password' />
                <button
                  type="submit"
                  className="btn btn-primary w-full py-2.5 text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                  disabled={isSubmitting || loading}
                >
                  <span className="inline-block mr-2">Me connecter</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
              <div className="py-5">
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-center sm:text-left whitespace-nowrap">
                    <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-base-content hover:bg-base-100 ring-inset">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                      <span className="inline-block ml-1">Mot de passe oublié ?</span>
                    </button>
                  </div>
                  <div className="text-center sm:text-right  whitespace-nowrap">
                    <button
                      className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-base-content hover:bg-base-100 ring-inset"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-bottom	">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="inline-block ml-1">Aide</span>
                    </button>
                  </div>
                  <div className="text-center sm:text-left whitespace-nowrap">
                    <Link
                      to={'/auth/register'}
                      className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-base-content hover:bg-base-100 ring-inset"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-bottom">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                      </svg>
                      <span className="inline-block ml-1">Créer un compte</span>
                    </Link>

                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <div className="py-5">
        <div className="grid grid-cols-2 gap-1">
          <div className="text-center sm:text-left whitespace-nowrap">
            <Link
              to={'/'}
              className="mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-base-content hover:bg-base-100 ring-inset">
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

export default Login;