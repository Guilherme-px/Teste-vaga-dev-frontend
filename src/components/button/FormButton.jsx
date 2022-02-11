import React from 'react';
import style from '../form/Form.module.css';

const FormButton = (props) => {
    return (
        <div className={style.buttons}>
            <button className={style.clear__btn}>Limpar campos</button>
            <button className={style.simulate_btn}>Simular</button>
        </div>
    );
};

export default FormButton;
