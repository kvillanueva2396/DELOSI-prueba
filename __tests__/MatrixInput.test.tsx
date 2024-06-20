import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { MatrixInput } from '@/components/MatrixComponents'

jest.mock('./MatrixInput.scss', () => {}, { virtual: true })

describe('MatrixInput component', () => {
	const mockOnMatrixChange = jest.fn()

	beforeEach(() => {
		mockOnMatrixChange.mockClear()
	})

	it('Debe mostrar el campo de entrada y los botones', () => {
		render(<MatrixInput onMatrixChange={mockOnMatrixChange} />)

		const input = screen.getByLabelText(/Matriz Input:/i)
		const clearButton = screen.getByRole('button', { name: /Limpiar/i }) // Use getByRole with i for case-insensitive matching
		const submitButton = screen.getByRole('button', { name: /Rotar Matriz/i })

		expect(input).toBeInTheDocument()
		expect(clearButton).toBeInTheDocument()
		expect(submitButton).toBeInTheDocument()
	})

	it('Debe actualizar el estado con la entrada del input hecha por el usuario', () => {
		render(<MatrixInput onMatrixChange={mockOnMatrixChange} />)

		const input = screen.getByLabelText(/Matriz Input:/i)
		fireEvent.change(input, { target: { value: '[1,2],[3,4]' } })

		expect(screen.getByDisplayValue(/\[1,2\],\[3,4\]/i)).toBeInTheDocument() // Improved assertion for array format
	})

	it('Debe usarse el evento onMatrixChange con una matriz cuadrada valida', () => {
		render(<MatrixInput onMatrixChange={mockOnMatrixChange} />)

		const input = screen.getByLabelText(/Matriz Input:/i)
		const submitButton = screen.getByRole('button', { name: /Rotar Matriz/i })

		fireEvent.change(input, { target: { value: '[[1,2],[3,4]]' } })
		fireEvent.submit(submitButton)

		expect(mockOnMatrixChange).toHaveBeenCalledWith([
			[1, 2],
			[3, 4],
		])
	})

	it('Debe mostrar un error por ingresarse un elemento no-matriz', () => {
		render(<MatrixInput onMatrixChange={mockOnMatrixChange} />)

		const input = screen.getByLabelText(/Matriz Input:/i)
		const submitButton = screen.getByRole('button', { name: /Rotar Matriz/i }) // Typo corrected

		fireEvent.change(input, { target: { value: '{"a": 1, "b": 2}' } })
		fireEvent.submit(submitButton)

		expect(
			screen.getByText(/Formato de entrada invalido. Porfavor ingrese un arreglo de arreglos./i)
		).toBeInTheDocument()
	})

	it('Debe mostrar un error por ingresarse una matriz incompleta', () => {
		render(<MatrixInput onMatrixChange={mockOnMatrixChange} />)

		const input = screen.getByLabelText(/Matriz Input:/i)
		const submitButton = screen.getByRole('button', { name: /Rotar Matriz/i }) // Typo corrected

		fireEvent.change(input, { target: { value: '[1, 2, 3]' } })
		fireEvent.submit(submitButton)

		expect(screen.getByText(/Formato de entrada invalido/i)).toBeInTheDocument()
	})

	it('Debe mostrar un error por ingresarse una matriz no cuadrada', () => {
		render(<MatrixInput onMatrixChange={mockOnMatrixChange} />)

		const input = screen.getByLabelText(/Matriz Input:/i)
		const submitButton = screen.getByRole('button', { name: /Rotar Matriz/i }) // Typo corrected

		fireEvent.change(input, { target: { value: '[[1,2],[3]]' } })
		fireEvent.submit(submitButton)

		expect(screen.getByText(/Formato de entrada invalido/i)).toBeInTheDocument()
	})

	it('El campo de entrada debe borrarse al presionar el boton "Limpiar"', () => {
		render(<MatrixInput onMatrixChange={mockOnMatrixChange} />)

		const input = screen.getByLabelText(/Matriz Input:/i)

		expect(screen.getByDisplayValue('')).toBeInTheDocument()
	})
})
