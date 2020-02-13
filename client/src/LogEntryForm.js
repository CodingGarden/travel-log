import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GithubLoginButton } from "react-social-login-buttons";

import { createLogEntry } from './API';

const LogEntryForm = ({ location, onClose, auth }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      await createLogEntry(data);
      onClose();
    } catch (error) {
      console.error(error);
      if(error.message === 'Token is not valid'){
        window.localStorage.removeItem("jwt");
        setTimeout(
          function() {              
              window.location.reload(); // Reload page so user can Login again
          }
          // eslint-disable-next-line
          .bind(this),
          5000
        );
      }
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
    { auth ? (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      { error ? <h3 className="error">{error}</h3> : null}         
      <label htmlFor="title">Title</label>
      <input name="title" required ref={register} />
      <label htmlFor="comments">Comments</label>
      <textarea name="comments" rows={3} ref={register}></textarea>
      <label htmlFor="description">Description</label>
      <textarea name="description" rows={3} ref={register}></textarea>
      <label htmlFor="image">Image</label>
      <input name="image" ref={register} />
      <label htmlFor="visitDate">Visit Date</label>
      <input name="visitDate" type="date" required ref={register} />
      <button disabled={loading}>{loading ? 'Loading...' : 'Create Entry'}</button>
    </form>
    )
    : <GithubLoginButton onClick={() => window.location.href = `${process.env.REACT_APP_API_URL}/auth/github`} /> }   
    </div>
  );
};

export default LogEntryForm;