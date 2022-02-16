import { render } from '@testing-library/react';
import Form from '../components/form/Form';

beforeEach(() => {
    render(<Form />);
});

describe('Testes da div de resultado da simulação de investimento', () => {

    test('Deve iniciar sem a div do resultado da simulações ', () => {
        const simulation = document.querySelector('#simulationResult');
        expect(simulation).not.toBeInTheDocument();
    });

});
