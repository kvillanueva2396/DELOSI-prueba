import { rotateMatrix } from './RotateMatrix'

describe('rotateMatrix', () => {
	test('Rotar matriz de 2x2', () => {
		const matrix = [
			[1, 2],
			[3, 4],
		]
		const expectedRotatedMatrix = [
			[2, 4],
			[1, 3],
		]
		expect(rotateMatrix(matrix)).toEqual(expectedRotatedMatrix)
	})

	test('Rotar matriz de 3x3', () => {
		const matrix = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		]
		const expectedRotatedMatrix = [
			[3, 6, 9],
			[2, 5, 8],
			[1, 4, 7],
		]
		expect(rotateMatrix(matrix)).toEqual(expectedRotatedMatrix)
	})
})
