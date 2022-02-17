import React from 'react';

// Css
import style from './FormInput.module.css';

const FormInput = (props) => {
    return (
        <>
            <div className={props.err ? style.alert : style.form__field}>
                <label htmlFor={props.htmlFor}>{props.labelText}</label>
                <input
                    id={props.id}
                    type={props.type}
                    value={props.value}
                    onChange={props.handleOnChange}
                    readOnly={props.readOnly}
                />
                <p>{props.err}</p>
            </div>
        </>
    );
};

export default FormInput;
