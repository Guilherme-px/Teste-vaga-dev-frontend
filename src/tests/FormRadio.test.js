import { fireEvent, render, screen } from '@testing-library/react';

import Form from '../components/form/Form';

beforeEach(() => {
    render(<Form />);
});

describe('Teste dos input radio do component Form', () => {
    test('Deve renderizar o primeiro grupo de inputs radio', () => {
        const brutoRadio = screen.getByRole('radio', { name: 'Bruto' });
        const liquidRadio = screen.getByRole('radio', { name: 'Liquido' });

        expect(brutoRadio).toBeInTheDocument();
        expect(liquidRadio).toBeInTheDocument();
    });

    test('Deve renderizar o segundo grupo de inputs radio', () => {
        const preRadio = screen.getByRole('radio', { name: 'PRÉ' });
        const posRadio = screen.getByRole('radio', { name: 'POS' });
        const fixadoRadio = screen.getByRole('radio', { name: 'FIXADO' });

        expect(preRadio).toBeInTheDocument();
        expect(posRadio).toBeInTheDocument();
        expect(fixadoRadio).toBeInTheDocument();
    });

    test('Deve iniciar o radio Bruto selecionado e o Liquido desmarcado', () => {
        const brutoRadio = screen.getByLabelText('Bruto');
        const liquidRadio = screen.getByLabelText('Liquido');

        expect(brutoRadio).toBeChecked();
        expect(liquidRadio).not.toBeChecked();
    });

    test('Deve desmarcar um radio quando o outro for selecionado', async () => {
        const brutoRadio = screen.getByLabelText('Bruto');
        const liquidRadio = screen.getByLabelText('Liquido');

        fireEvent.click(brutoRadio);
        expect(brutoRadio).toBeChecked();
        expect(liquidRadio).not.toBeChecked();

        fireEvent.click(liquidRadio);
        expect(liquidRadio).toBeChecked();
        expect(brutoRadio).not.toBeChecked();
    });

    test('Deve iniciar o radio POS selecionado e os radios PRÉ e FIXADO desmarcados', () => {
        const preRadio = screen.getByLabelText('PRÉ');
        const posRadio = screen.getByLabelText('POS');
        const fixedRadio = screen.getByLabelText('FIXADO');

        expect(posRadio).toBeChecked();
        expect(preRadio).not.toBeChecked();
        expect(fixedRadio).not.toBeChecked();
    });

    test('Deve desmarcar um input quando o outro for selecionado', async () => {
        const preRadio = screen.getByLabelText('PRÉ');
        const posRadio = screen.getByLabelText('POS');
        const fixedRadio = screen.getByLabelText('FIXADO');

        expect(posRadio).toBeChecked();

        fireEvent.click(preRadio);
        expect(preRadio).toBeChecked();
        expect(posRadio).not.toBeChecked();
        expect(fixedRadio).not.toBeChecked();

        fireEvent.click(posRadio);
        expect(posRadio).toBeChecked();
        expect(preRadio).not.toBeChecked();
        expect(fixedRadio).not.toBeChecked();

        fireEvent.click(fixedRadio);
        expect(fixedRadio).toBeChecked();
        expect(posRadio).not.toBeChecked();
        expect(preRadio).not.toBeChecked();
    });
});
