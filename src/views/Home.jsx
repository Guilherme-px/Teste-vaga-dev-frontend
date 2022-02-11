import React from 'react';
import Form from '../components/form/Forms';

// Styles
import styles from './Home.module.css';

const Home = (props) => {
    return (
        <main className={styles.home}>
            <h1>Simulador de Investimentos</h1>
            <Form></Form>
        </main>
    );
};

export default Home;
