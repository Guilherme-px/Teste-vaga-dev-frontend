import React from 'react';
import style from './InvestimentResult.module.css';

const InvestimentResult = (props) => {
    return (
        <div className={style.info}>
            <h3>{props.infoTitle}</h3>
            <span>{props.infoResult}</span>
        </div>
    );
};

export default InvestimentResult;
