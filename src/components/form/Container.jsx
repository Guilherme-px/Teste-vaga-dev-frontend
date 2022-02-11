import React from 'react';
import style from './Container.module.css';

const Container = (props) => {
    return (
        <section>
            <div className={style.container}>{props.children}</div>
        </section>
    );
};

export default Container;
