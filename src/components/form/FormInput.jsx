import React from 'react';
import style from './FormInput.module.css';

const FormInput = (props) => {
    return (
        <>
            <div className={style.form__field}>
                <label htmlFor={props.htmlFor}>{props.labelText}</label>
                <input type={props.type} name={props.name} />
            </div>
        </>
    );
};

export default FormInput;
