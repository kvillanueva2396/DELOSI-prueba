import './home.scss'
import { MatrixDisplay, MatrixInput } from '@/components/MatrixComponents'
import Head from 'next/head'
import { useState } from 'react'
import { rotateMatrix } from 'utils/RotateMatrix'

export default function Home() {
	const [rotatedMatrix, setRotatedMatrix] = useState<number[][]>([])

	const handleMatrixChange = (newMatrix: number[][]) => {
		setRotatedMatrix(rotateMatrix(newMatrix))
	}

	return (
		<div>
			<Head>
				<title>Prueba Tecnica Frontend - DELOSI</title>
				<meta name="description" content="Rotar matriz en sentido horario" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<div className="home">
				<h1>Prueba Tecnica - Rotar matriz en sentido horario</h1>
				<MatrixInput onMatrixChange={handleMatrixChange} />
				<MatrixDisplay matrix={rotatedMatrix} />
			</div>
		</div>
	)
}
