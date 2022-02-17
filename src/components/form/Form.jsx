import React, { useState, useEffect } from 'react';

// Icons
import { FiInfo } from 'react-icons/fi';

// Css
import style from './Form.module.css';

// Utils
import axios from '../../utils/axios';

// Components
import FormButton from '../button/FormButton';
import FormInput from './FormInput';
import RadioInput from './RadioInput';
import InvestimentResult from './InvestimentResult';
import Container from './Container';

const Form = (props) => {
    // Recebe os valores dos grupos de input type radio
    const [income, setIncome] = useState('bruto');
    const [indexing, setIndexing] = useState('pos');

    // Recebe os dados de cdi e ipca vindos da API
    const [cdi, setCdi] = useState([]);
    const [ipca, setIpca] = useState([]);

    // Recebe os dados das simulações vindos da API
    const [simulations, setSimulations] = useState([]);

    // Recebe os valores digitados nos inputs do formulario e inicia o estado deles vazio como padrão
    const [values, setValues] = useState({
        initialContribution: '',
        term: '',
        monthlyContribution: '',
        profitability: '',
    });

    // Recebe os valores de cada erros
    const [errors, setErrors] = useState({});

    // Caputra o valor selecionado no primero grupo de input radio
    const changeRadioincome = (e) => {
        setIncome(e.target.value);
    };

    // Caputra o valor selecionado no segundo grupo de input radio
    const changeRadioIndexing = (e) => {
        setIndexing(e.target.value);
    };

    // Captura os valores digitados nos inputs e altera o estado
    function handleOnChange(e) {
        setValues({ ...values, [e.target.id]: e.target.value });
    }

    // Carrega os dados da API vindos de /indicadores e recebe os valores no estado
    useEffect(() => {
        axios.get('/indicadores').then((res) => {
            setCdi(res.data[0]);
            setIpca(res.data[1]);
        });
    }, []);

    // Pega os dados de /simulacoes filtrando de acordo com o valor atual do estado dos radio selecionados
    async function getSimulation(e) {
        e.preventDefault();
        setErrors(validate(values));
        const isSubmit = validate(values);

        if (
            isSubmit.initialContribution === undefined &&
            isSubmit.term === undefined &&
            isSubmit.monthlyContribution === undefined &&
            isSubmit.profitability === undefined
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

    // Valida os valores digitados nos inputs e envia os valores dos erros dos inputs
    const validate = (value) => {
        const error = {};
        const regex = /(?=.*\d)^(\R\$)?([0-9]*)?(.\d{3})*?(\,\d{2})?$/;
        const regexMoney =
            /(?=.*\d)^(\R\$)?(([1-9]\d{0,2}(.\d{3})*)|0)?(\,\d{2})?$/;
        const regexPercentage = /^([0-9]*)?(\%)?$/;

        if (
            !regex.test(value.initialContribution) ||
            !value.initialContribution
        ) {
            error.initialContribution = 'Aporte deve ser um numero';
        } else if (!regexMoney.test(value.initialContribution)) {
            error.initialContribution = 'Formatar como Ex: R$4.500,00';
        }

        if (!regex.test(value.term) || !value.term) {
            error.term = 'Prazo deve ser um numero';
        }

        if (
            !regex.test(value.monthlyContribution) ||
            !value.monthlyContribution
        ) {
            error.monthlyContribution = 'Aporte deve ser um numero';
        } else if (!regexMoney.test(value.monthlyContribution)) {
            error.monthlyContribution = 'Formatar como Ex: R$4.500,00';
        }

        if (
            !regexPercentage.test(value.profitability) ||
            !value.profitability
        ) {
            error.profitability = 'Rentabilidade deve ser um numero';
        }

        return error;
    };

    // Apenas recarrega a pagina para zerar o estado
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
                                htmlFor='initialContribution'
                                labelText='Aporte Inicial'
                                type='text'
                                value={values.initialContribution}
                                id='initialContribution'
                                handleOnChange={handleOnChange}
                                err={errors.initialContribution}
                            />
                            <FormInput
                                htmlFor='term'
                                labelText='Prazo (em meses)'
                                type='text'
                                value={values.term}
                                id='term'
                                handleOnChange={handleOnChange}
                                err={errors.term}
                            />
                            <FormInput
                                htmlFor='ipca'
                                labelText='IPCA (ao ano)'
                                type='text'
                                id='ipca'
                                value={ipca.valor + '%'}
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
                                htmlFor='monthlyContribution'
                                labelText='Aporte Mensal'
                                type='text'
                                value={values.monthlyContribution}
                                id='monthlyContribution'
                                handleOnChange={handleOnChange}
                                err={errors.monthlyContribution}
                            />
                            <FormInput
                                htmlFor='profitability'
                                labelText='Rentabilidade'
                                type='text'
                                value={values.profitability}
                                id='profitability'
                                handleOnChange={handleOnChange}
                                err={errors.profitability}
                            />
                            <FormInput
                                htmlFor='cdi'
                                labelText='CDI (ao ano)'
                                type='text'
                                id='cdi'
                                value={cdi.valor + '%'}
                                readOnly={true}
                            />
                        </div>
                    </div>
                </form>
                <FormButton
                    simular={getSimulation}
                    reset={clearPage}
                    disabled={
                        !values.initialContribution ||
                        !values.monthlyContribution ||
                        !values.term ||
                        !values.profitability
                    }
                />
            </div>

            {simulations.length > 0 && (
                <div className={style.investiment} id='simulationResult'>
                    <div className={style.subtitle}>
                        <h3>Resultado da Simulação</h3>
                    </div>
                    {simulations.map((simulation, i) => (
                        <div className={style.investiment__info} key={i}>
                            <InvestimentResult
                                infoTitle='Valor final Bruto'
                                infoResult={'R$ ' + simulation.valorFinalBruto}
                            />
                            <InvestimentResult
                                infoTitle='Alíquota do IR'
                                infoResult={simulation.aliquotaIR + '%'}
                            />
                            <InvestimentResult
                                infoTitle='Valor Pago em IR'
                                infoResult={'R$ ' + simulation.valorPagoIR}
                            />
                            <InvestimentResult
                                infoTitle='Valor Final Líquido'
                                infoResult={
                                    'R$ ' + simulation.valorFinalLiquido
                                }
                                style={{ color: '#118C12' }}
                            />
                            <InvestimentResult
                                infoTitle='Valor Total Investido'
                                infoResult={
                                    'R$ ' + simulation.valorTotalInvestido
                                }
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
