import React from 'react';
import style from './RadioInput.module.css';
import { FiCheck, FiInfo } from 'react-icons/fi';

const RadioInput = (props) => {
    return (
        <>
            <input
                type={props.type}
                className={style.radio__input}
                value={props.value}
                name={props.name}
                id={props.id}
                checked={props.stateName == props.value ? true : false}
                onChange={props.handleOnChange}
            />
            {props.stateName == props.value ? (
                <label className={style.radio__label} htmlFor={props.htmlFor}>
                    <FiCheck size={20} />
                    {props.text}
                </label>
            ) : (
                <label className={style.radio__label} htmlFor={props.htmlFor}>
                    {props.text}
                </label>
            )}
        </>
    );
};

export default RadioInput;
