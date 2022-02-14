import React from 'react';
import style from '../form/Form.module.css';

const FormButton = (props) => {
    return (
        <div className={style.buttons}>
            <button className={style.clear__btn} onClick={props.reset}>
                Limpar campos
            </button>
            <button
                className={style.simulate_btn}
                onClick={props.simular}
                disabled={props.disabled}
                style={props.style}
            >
                Simular
            </button>
        </div>
    );
};

export default FormButton;
