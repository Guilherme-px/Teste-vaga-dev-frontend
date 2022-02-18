# Teste para vaga de emprego

Este projeto é um teste para vaga de desenvolvedor frontend júnior.

## Algumas tecnologias utilizadas nesse projeto

- **Biblioteca react** para agilizar o desenvolvimento com as funcionalidades disponibilizadas na biblioteca.

- **Webpack** como um recurso de boas praticas e evitar crossbrowser.

- **Docker** para simular ambientes semelhante entre SO e manter uma padronização.

- **Babel** como transpilador para evitar conflitos em browsers diferentes.

- **React testing-library** e **jest** para desenvolvimento de testes unitários.

- **Axios** para consumir a API disponibilizada para o projeto.

- **Eslint** e prettier para estilizar e automatizar a edentação do código e manter a padronização.

- **Chartjs** para a criação do gráfico.

### Rodando o projeto com webpack

Na raiz do projeto use comando `npm run serve` como especificado em package.json, o projeto ira rodar http://localhost:4000

### Criando imagem com docker e rodando o projeto com container do docker

Na raiz do projeto use o comando `docker build -t nomeDaSuaImagem .` para criar uma imagem docker do projeto, depois rode o comando `docker run -it -p 4000:4000 nomeDaSuaImagem` para rodar o container da aplicação em http://localhost:4000

### Rodando os tests

Na raiz do projeto use o comando `npm run test` para rodar os testes.

### Componentes da aplicação

**src/components/form**

**Container.jsx**

Este componente é o container da sessão principal da aplicação, ele recebe todo o conteúdo de **Form.jsx** através de `props.children`

```
const Container = (props) => {
    return (
        <section>
            <div className={style.container}>{props.children}</div>
        </section>
    );
};
```

**Form.jsx**

Abaixo temos a importação do componente controlado **RadioInput** dentro de **Form.jsx**

Componentes controlados: https://pt-br.reactjs.org/docs/forms.html#controlled-components

```
<RadioInput
    stateName={income}
    handleOnChange={changeRadioincome}
    title='Rendimentos'
    value='bruto'
    name='redimento'
    id='redimentoBruto'
    htmlFor='redimentoBruto'
    text='Bruto'
/>
```

**RadioInput.jsx**

```
<input
    type='radio'
    className={style.radio__input}
    value={props.value}
    name={props.name}
    id={props.id}
    checked={props.stateName == props.value ? true : false}
    onChange={props.handleOnChange}
/>
```

Todos os valores das propriedades presentes no input são recebidas por props.

`onChange={props.handleOnChange}` é recebido por props `handleOnChange={changeRadioincome}`.

`changeRadioincome` é a função responsável por pegar o valor do input selecionado e alterar o estado usando hook **useState**.

A função captura o valor do input através do `e.target.value` e altera o estado setando o novo valor com `setIncome()`

```
const changeRadioincome = (e) => {
    setIncome(e.target.value);
};
```

O estado por padrão inicia com o valor **'bruto'** e através de `income` podemos acessar o valor atual do estado.

```
const [income, setIncome] = useState('bruto');
```

Este valor depois e passado para `stateName={income}` no input para ser recebido por props `checked={props.stateName == props.value ? true : false}` para alterar qual radio esta selecionada através de uma operação ternaria.

Esta propriedade também servira para deixar apenas o input selecionado com o ícone visível através de uma operação ternaria, se o valor de `props.stateName` igual ao valor de `props.value` então será exibida a label do input com um ícone, caso `props.stateName === props.value` seja falso então sera exibida apenas a label com o valor recebido por `props.text`.

```
{props.stateName === props.value ? (
    <label className={style.radio__label} htmlFor={props.htmlFor}>
        <FiCheck size={20} />
        {props.text}
    </label>
) : (
    <label className={style.radio__label} htmlFor={props.htmlFor}>
        {props.text}
    </label>
)}
```

O mesmo é feito para o segundo grupo de inputs tipo radio mas usando a função `changeRadioIndexing`.


**FormInput.jsx**

`className` recebe uma operação ternaria se `props.err` for verdadeiro então ele recebera o css de `style.alert`
caso seja falso então recebera o css de `style.form__field`

```
<div className={props.err ? style.alert : style.form__field}></div>
```

O componente **FormInput.jsx** recebe todos os seus atributos através de props.

```
<div className={props.err ? style.alert : style.form__field}>
    <label htmlFor={props.htmlFor}>{props.labelText}</label>
    <input
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={props.handleOnChange}
        readOnly={props.readOnly}
        onKeyUp={props.handleOnKeyUp}
    />
    <p>{props.err}</p>
</div>
```

`onChange={props.handleOnChange}` recebe a função `handleOnChange` responsavel por capturar o valor digitado no input e alterar o estado.

```
function handleOnChange(e) {
    setValues({ ...values, [e.target.id]: e.target.value });
}
```

O estado do componente é iniciado com o atributo value de cada input como vazio usando o hook **useState**.

```
const [values, setValues] = useState({
    initialContribution: '',
    term: '',
    monthlyContribution: '',
    profitability: '',
});
```

`<p>{props.err}</p>` exibira os erros de cada input caso o usuário tente submeter o formulário com valores inválidos.

Os erros são validados na função `validate` que recebe como parâmetro o valor de cada input as validações são feitas usando regex.

`const regex` aceita que o input contenha ou não com **R$** no **inicio** do input e apos isso contenha apenas números, a cada grupo de 3 dígitos ele aceite um '.' e os dois últimos dígitos sejam separados por uma ','.

`const regexMoney` valida a formatação monetária em reais podendo conter ou não com **R$** no **inicio** e tenha separação das casas decimais com '.' e os dois últimos dígitos sejam separados com ','.

`const regexPercentage` valida formatação de porcentagem **iniciando** e contento apenas números e podendo conter '%' no final.

A função fara validações condicionais para cada input e caso caia em alguma delas, uma mensagem de erro sera retornada.

```
const validate = (value) => {
    const error = {};
    const regex = /(?=.*\d)^(\R\$)?([0-9]*)?(.\d{3})*?(\,\d{2})?$/;
    const regexMoney = /(?=.*\d)^(\R\$)?(([1-9]\d{0,2}(.\d{3})*)|0)?(\,\d{2})?$/;
    const regexPercentage = /^([0-9]*)?(\%)?$/;

    if (
        !regex.test(value.initialContribution) ||
        !value.initialContribution
    ) {
        error.initialContribution = 'Aporte deve ser um numero';
    } else if (!regexMoney.test(value.initialContribution)) {
        error.initialContribution = 'Formatar como Ex: R$4.500,00';
    }

    if (
        !regexPercentage.test(value.profitability) ||
        !value.profitability
    ) {
        error.profitability = 'Rentabilidade deve ser um numero';
    }

    ...

    return error;
};
```

Em `alue={props.value}` recebera um valor por props de `value={ipca.valor + '%'}` ou `value={ipca.valor + '%'}` que vira com o valor padrão vindo da API que será carregado com o hook **useEffect** pegando a resposta com a requisição feita com axios e setando no estado da aplicação com `setCdi` e `setIpca` e podendo ser acessado com `cdi.nome` ou `cdi.valor`.

```
const [cdi, setCdi] = useState([]);
const [ipca, setIpca] = useState([]);

useEffect(() => {
    axios.get('/indicadores').then((res) => {
        setCdi(res.data[0]);
        setIpca(res.data[1]);
    });
}, []);
```

**src/components/button**

**FormButton.jsx**

O componente **FormButton** recebe todos os valores dos seus atributos por props.

```
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
```

`disabled={props.disabled}` recebera por pros os valores de `disabled={!values.initialContribution ||...}` ele verificara se os inputs estão vazios, se todos não forem preenchidos o botão ficara desabilitado.

O botão **Limpar campos** recebe por `onClick={props.reset}` uma função passada por `reset={clearPage}` que basicamente irá recarregar a pagina e gerar o estado da aplicação.

```
const clearPage = () => {
    window.location.reload();
};
```

O botão **Simular** recebe por `onClick={props.simular}` uma função passada por `simular={getSimulation}` que fara uma requisição a API em `simulacoes` caso todos os inputs tenham valores validos.

A função `getSimulation()` inicialmente quando for chamada irá chamar a função `validate(values)` setando o retorno dela sem `setErrors` e então fara uma verificação se os valores retornados de função `validate(values)` são `undefined` o que significa que nenhuma mensagem de erro foi retornada pela função, então será feita uma requisição com axios para a rota `/simulacoes?tipoIndexacao=${indexing}&tipoRendimento=${income}` recebendo por parâmetro os valores dos estados `indexing` e `income` de `useState`, caso a requisição ocorra com sucesso ele irá retornar os dados recebidos como resposta e setar esses dados em `setSimulations`.

```
const [simulations, setSimulations] = useState([]);
const [errors, setErrors] = useState({});

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
```

**src/components/InvestimentResult.jsx**

**InvestimentResult.jsx**

Este componente contem a `<div>` onde ficam os cards com os resultados da simulação obtidos na API.

```
<div className={style.info}>
    <h3>{props.infoTitle}</h3>
    <span style={props.style}>{props.infoResult}</span>
</div>
```

Em **Form.jsx** ele será renderizado apenas se `simulations.length > 0`.

Quando for renderizado ser feito um `map` com `simulations.map((simulation, i)` e os cards serão preenchidos com os dados retornados pela API. Ex: `infoResult={'R$ ' + simulation.valorFinalBruto}`.