import { render, screen } from '@testing-library/react';

import Form from '../components/form/Form';

beforeEach(() => {
    render(<Form />);
});

describe('Inputs do componente Form', () => {
    test('Deve renderizar o input aporte inicial', () => {
        const input = screen.getByRole('textbox', { name: /aporte inicial/i });

        expect(input).toBeInTheDocument();
    });

    test('Deve renderizar o input prazo', () => {
        const input = screen.getByRole('textbox', {
            name: /prazo \(em meses\)/i,
        });

        expect(input).toBeInTheDocument();
    });

    test('Deve renderizar o input ipca', () => {
        const input = screen.getByRole('textbox', { name: /ipca \(ao ano\)/i });

        expect(input).toBeInTheDocument();
    });

    test('Deve renderizar o input aporte mensal', () => {
        const input = screen.getByRole('textbox', { name: /aporte mensal/i });

        expect(input).toBeInTheDocument();
    });

    test('Deve renderizar o input rentabilidade', () => {
        const input = screen.getByRole('textbox', { name: /rentabilidade/i });

        expect(input).toBeInTheDocument();
    });

    test('Deve renderizar o input cdi', () => {
        const input = screen.getByRole('textbox', { name: /cdi \(ao ano\)/i });

        expect(input).toBeInTheDocument();
    });
});
