export const DateInFormat = () => {
	const date: Date = new Date()
	return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('.')
}