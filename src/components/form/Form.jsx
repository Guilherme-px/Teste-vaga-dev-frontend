import React, { useState, useEffect } from 'react';

import { FiInfo } from 'react-icons/fi';

import style from './Form.module.css';

// Ultils
import axios from '../../utils/axios';

// Components
import FormButton from '../button/FormButton';
import FormInput from './FormInput';
import RadioInput from './RadioInput';
import InvestimentResult from './InvestimentResult';
import Container from './Container';

const Form = (props) => {
    const [income, setIncome] = useState('bruto');
    const [indexing, setIndexing] = useState('pos');
    const [cdi, setCdi] = useState([]);
    const [ipca, setIpca] = useState([]);
    const [simulations, setSimulations] = useState([]);
    const initialValues = {
        aport_inicial: '',
        prazo: '',
        aport_mensal: '',
        rentabilidade: '',
    };
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const changeRadioincome = (e) => {
        setIncome(e.target.value);
    };

    const changeRadioIndexing = (e) => {
        setIndexing(e.target.value);
    };

    function handleChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        axios.get('/indicadores').then((res) => {
            setCdi(res.data[0]);
            setIpca(res.data[1]);
        });
    }, []);

    async function getSimulation(e) {
        e.preventDefault();
        setErrors(validate(values));
        const isSubmit = validate(values);

        if (
            isSubmit.aport_inicial === undefined &&
            isSubmit.prazo === undefined &&
            isSubmit.aport_mensal === undefined &&
            isSubmit.rentabilidade === undefined
        ) {
            await axios
                .get(
                    `/simulacoes?tipoIndexacao=${indexing}&tipoRendimento=${income}`
                )
                .then((res) => {
                    return setSimulations(res.data);
                });
        }
    }

    const validate = (value) => {
        const error = {};
        const regex = /^[0-9]*$/;

        if (!regex.test(value.aport_inicial) || !value.aport_inicial) {
            error.aport_inicial = 'Aporte deve ser um numero';
        }

        if (!regex.test(value.prazo) || !value.prazo) {
            error.prazo = 'Prazo deve ser um numero';
        }

        if (!regex.test(value.aport_mensal) || !value.aport_mensal) {
            error.aport_mensal = 'Aporte deve ser um numero';
        }

        if (!regex.test(value.rentabilidade) || !value.rentabilidade) {
            error.rentabilidade = 'Rentabilidade deve ser um numero';
        }

        return error;
    };

    const clearPage = () => {
        window.location.reload();
    };

    return (
        <Container>
            <div className={style.form__content}>
                <div className={style.subtitle}>
                    <h2>Rendimento</h2>
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
                                value={values.aport_inicial}
                                name='aport_inicial'
                                handleOnChange={handleChange}
                                err={errors.aport_inicial}
                            />
                            <FormInput
                                htmlFor='prazo'
                                labelText='Prazo (em meses)'
                                type='text'
                                value={values.prazo}
                                name='prazo'
                                handleOnChange={handleChange}
                                err={errors.prazo}
                            />
                            <FormInput
                                htmlFor='ipca'
                                labelText='IPCA (ao ano)'
                                type='text'
                                name='ipca'
                                value={ipca.valor + '%' || ''}
                                readOnly={true}
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
                                    value='ipca'
                                    name='indexação'
                                    id='indexaçãoFixado'
                                    htmlFor='indexaçãoFixado'
                                    text='FIXADO'
                                />
                            </div>
                            <FormInput
                                htmlFor='aport_mensal'
                                labelText='Aporte Mensal'
                                type='text'
                                value={values.aport_mensal}
                                name='aport_mensal'
                                handleOnChange={handleChange}
                                err={errors.aport_mensal}
                            />
                            <FormInput
                                htmlFor='rentabilidade'
                                labelText='Rentabilidade'
                                type='text'
                                value={values.rentabilidade}
                                name='rentabilidade'
                                handleOnChange={handleChange}
                                err={errors.rentabilidade}
                            />
                            <FormInput
                                htmlFor='cdi'
                                labelText='CDI (ao ano)'
                                type='text'
                                name='cdi'
                                value={cdi.valor + '%' || ''}
                                readOnly={true}
                            />
                        </div>
                    </div>
                </form>
                <FormButton
                    simular={getSimulation}
                    reset={clearPage}
                    disabled={
                        !values.aport_inicial ||
                        !values.aport_mensal ||
                        !values.prazo ||
                        !values.rentabilidade
                    }
                />
            </div>

            {simulations.length > 0 && (
                <div className={style.investiment}>
                    <div className={style.subtitle}>
                        <h3>Resultado da Simulação</h3>
                    </div>
                    {simulations.map((simulation, i) => (
                        <div className={style.investiment__info} key={i}>
                            <InvestimentResult
                                infoTitle='Valor final Bruto'
                                infoResult={simulation.valorFinalBruto}
                            />
                            <InvestimentResult
                                infoTitle='Alíquota do IR'
                                infoResult={simulation.aliquotaIR}
                            />
                            <InvestimentResult
                                infoTitle='Valor Pago em IR'
                                infoResult={simulation.valorPagoIR}
                            />
                            <InvestimentResult
                                infoTitle='Valor Final Líquido'
                                infoResult={simulation.valorFinalLiquido}
                                style={{ color: '#118C12' }}
                            />
                            <InvestimentResult
                                infoTitle='Valor Total Investido'
                                infoResult={simulation.valorTotalInvestido}
                            />
                            <InvestimentResult
                                infoTitle='Ganho Líquido'
                                infoResult={simulation.ganhoLiquido}
                                style={{ color: '#118C12' }}
                            />
                        </div>
                    ))}

                    <div className={style.graphs}>
                        <h3>Projeção de Valores</h3>
                        <div className={style.graph__bar}></div>
                        <div className={style.graph__column}></div>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default Form;
