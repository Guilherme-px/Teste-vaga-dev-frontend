import React, { useState } from 'react';

import { FiInfo } from 'react-icons/fi';

import style from './Form.module.css';

// Components
import FormButton from '../button/FormButton';
import FormInput from './FormInput';
import RadioInput from './RadioInput';
import InvestimentResult from './InvestimentResult';
import Container from './Container';

const Form = (props) => {
    const [income, setIncome] = useState('bruto');
    const [indexing, setIndexing] = useState('pos');

    const changeRadioincome = (e) => {
        setIncome(e.target.value);
    };

    const changeRadioIndexing = (e) => {
        setIndexing(e.target.value);
    };

    return (
        <Container>
            <div className={style.form__content}>
                <div className={style.subtitle}>
                    <h2>Simulador</h2>
                </div>
                <form>
                    <div className={style.col}>
                        <div className={style.form__radio}>
                            <div className={style.input__title}>
                                <span>Rendimento</span>
                                <FiInfo />
                            </div>
                            <div className={style.radio}>
                                <RadioInput
                                    stateName={income}
                                    handleOnChange={changeRadioincome}
                                    title='Rendimentos'
                                    type='radio'
                                    value='bruto'
                                    name='redimento'
                                    id='redimentoBruto'
                                    htmlFor='redimentoBruto'
                                    text='Bruto'
                                />
                                <RadioInput
                                    stateName={income}
                                    handleOnChange={changeRadioincome}
                                    type='radio'
                                    value='liquido'
                                    name='redimento'
                                    id='redimentoLiquido'
                                    htmlFor='redimentoLiquido'
                                    text='Liquido'
                                />
                            </div>
                            <FormInput
                                htmlFor='aport_inicial'
                                labelText='Aporte Inicial'
                                type='text'
                                name='aport_inicial'
                            />
                            <FormInput
                                htmlFor='prazo'
                                labelText='Prazo (em meses)'
                                type='text'
                                name='prazo'
                            />
                            <FormInput
                                htmlFor='ipca'
                                labelText='IPCA (ao ano)'
                                type='text'
                                name='ipca'
                            />
                        </div>
                    </div>
                    <div className={style.col}>
                        <div className={style.form__radio}>
                            <div className={style.input__title}>
                                <span>Tipos de indexação</span>
                                <FiInfo />
                            </div>
                            <div className={style.radio}>
                                <RadioInput
                                    stateName={indexing}
                                    handleOnChange={changeRadioIndexing}
                                    title='Tipos de indexação'
                                    type='radio'
                                    value='pre'
                                    name='indexação'
                                    id='indexaçãoPre'
                                    htmlFor='indexaçãoPre'
                                    text='PRÉ'
                                />
                                <RadioInput
                                    stateName={indexing}
                                    handleOnChange={changeRadioIndexing}
                                    type='radio'
                                    value='pos'
                                    name='indexação'
                                    id='indexaçãoPos'
                                    htmlFor='indexaçãoPos'
                                    text='POS'
                                />
                                <RadioInput
                                    stateName={indexing}
                                    handleOnChange={changeRadioIndexing}
                                    type='radio'
                                    value='fixado'
                                    name='indexação'
                                    id='indexaçãoFixado'
                                    htmlFor='indexaçãoFixado'
                                    text='FIXADO'
                                />
                            </div>
                            <FormInput
                                htmlFor='aport_inicial'
                                labelText='Aporte Mensal'
                                type='text'
                                name='aport_inicial'
                            />
                            <FormInput
                                htmlFor='aport_inicial'
                                labelText='Rentabilidade'
                                type='text'
                                name='aport_inicial'
                            />
                            <FormInput
                                htmlFor='aport_inicial'
                                labelText='CDI (ao ano)'
                                type='text'
                                name='aport_inicial'
                            />
                        </div>
                    </div>
                </form>
                <FormButton />
            </div>

            <div className={style.investiment}>
                <div className={style.subtitle}>
                    <h3>Resultado da Simulação</h3>
                </div>
                <div className={style.investiment__info}>
                    <InvestimentResult
                        infoTitle='Valor final Bruto'
                        infoResult='150000'
                    />
                    <InvestimentResult
                        infoTitle='Valor final Bruto'
                        infoResult='150000'
                    />
                    <InvestimentResult
                        infoTitle='Valor final Bruto'
                        infoResult='150000'
                    />
                    <InvestimentResult
                        infoTitle='Valor final Bruto'
                        infoResult='150000'
                    />
                    <InvestimentResult
                        infoTitle='Valor final Bruto'
                        infoResult='150000'
                    />
                    <InvestimentResult
                        infoTitle='Valor final Bruto'
                        infoResult='150000'
                    />
                </div>

                <div className={style.graphs}>
                    <h3>Projeção de Valores</h3>
                    <div className={style.graph__bar}></div>
                    <div className={style.graph__column}></div>
                </div>
            </div>
        </Container>
    );
};

export default Form;
