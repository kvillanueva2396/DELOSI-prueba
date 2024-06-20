import './MatrixInput.scss'
import React, { ChangeEvent, FormEvent, useState } from 'react'

interface Props {
	onMatrixChange: (matrix: number[][]) => void
}

const MatrixInput = ({ onMatrixChange }: Props) => {
	const [matrix, setMatrix] = useState('')
	const [error, setError] = useState('')

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMatrix(e.target.value)
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const parsedMatrix: number[][] = JSON.parse(matrix)

			const isValidMatrixFormat =
				Array.isArray(parsedMatrix) && parsedMatrix.every(row => Array.isArray(row))

			const isSquareMatrix =
				parsedMatrix.length >= 2 && parsedMatrix.every(row => row.length === parsedMatrix.length)

			if (isSquareMatrix && isValidMatrixFormat) {
				onMatrixChange(parsedMatrix)
				setError('')
			} else {
				throw new Error()
			}
		} catch (error) {
			setError('Formato de entrada invalido. Porfavor ingrese un arreglo de arreglos.')
		}
	}

	return (
		<form className="matrix-input" onSubmit={handleSubmit}>
			<label>
				Matriz Input: <input value={matrix} onChange={handleChange} />
			</label>

			<div className="input-buttons">
				<button className="input-buttons__clean" type="button" onClick={() => setMatrix('')}>
					Limpiar
				</button>
				<button className="input-buttons__submit" type="submit">
					Rotar Matriz
				</button>
			</div>
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</form>
	)
}

export default MatrixInput
