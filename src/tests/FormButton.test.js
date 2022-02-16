import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Form from '../components/form/Form';

beforeEach(() => {
    render(<Form />);
});

describe('Botões do componente Form', () => {
    test('Deve renderizar botão simular', async () => {
        const buttonSimulate = screen.getByRole('button', { name: /Simular/i });

        expect(buttonSimulate).toBeInTheDocument();
    });

    test('Deve iniciar o botão simular desabilitado', async () => {
        const buttonSimulate = screen.getByRole('button', { name: /Simular/i });

        expect(buttonSimulate).toBeDisabled();
    });

    test('Deve conter a classe simulate_btn no botão simular', async () => {
        const buttonSimulate = screen.getByRole('button', { name: /Simular/i });

        expect(buttonSimulate).toHaveClass('simulate_btn');
    });

    test('Deve renderizar o botão limpar campos', async () => {
        const buttonClear = screen.getByRole('button', {
            name: /Limpar campos/i,
        });

        expect(buttonClear).toBeInTheDocument();
    });

    test('Deve recarregar a pagina ao clicar no botão limpar campos', async () => {
        const buttonClear = screen.getByRole('button', {
            name: /Limpar campos/i,
        });

        userEvent.click(buttonClear);
        expect(window.location.reload);
    });
});
