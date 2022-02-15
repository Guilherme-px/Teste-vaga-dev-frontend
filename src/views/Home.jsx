import React from 'react';

// Components
import Form from '../components/form/Form';

// Styles
import styles from './Home.module.css';

const Home = (props) => {
    return (
        <main className={styles.home}>
            <h1>Simulador de Investimentos</h1>
            <Form />
        </main>
    );
};

export default Home;
