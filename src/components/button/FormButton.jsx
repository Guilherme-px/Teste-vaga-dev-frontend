import React from 'react';

// Css
import style from './FormButton.module.css';

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
            >
                Simular
            </button>
        </div>
    );
};

export default FormButton;
