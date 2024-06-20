import './MatrixDisplay.scss'
import React from 'react'

interface Props {
	matrix: number[][]
}

const MatrixDisplay = ({ matrix }: Props) => {
	return (
		<div className="matrix-display">
			{matrix.length > 0 && (
				<div className="matrix-content">
					<p>Matriz Output</p>
					<p>{JSON.stringify(matrix)}</p>
				</div>
			)}
		</div>
	)
}

export default MatrixDisplay
