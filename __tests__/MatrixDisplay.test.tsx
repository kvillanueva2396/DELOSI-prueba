import React from 'react'
import { render } from '@testing-library/react'
import { MatrixDisplay } from '@/components/MatrixComponents'

jest.mock('./MatrixDisplay.scss', () => {}, { virtual: true })

describe('MatrixDisplay component', () => {
	it('Debe mostrar la etiqueta "Matriz Output" cuando se proporciona una matriz.', () => {
		const matrix = [
			[1, 2],
			[3, 4],
		]
		const { getByText } = render(<MatrixDisplay matrix={matrix} />)

		expect(getByText(/Matriz Output/i)).toBeInTheDocument()
	})

	it('Debe mostrar el contenido de la matriz.', () => {
		const matrix = [
			[1, 2],
			[3, 4],
		]
		const { getByText } = render(<MatrixDisplay matrix={matrix} />)

		expect(getByText(JSON.stringify(matrix))).toBeInTheDocument()
	})
})
