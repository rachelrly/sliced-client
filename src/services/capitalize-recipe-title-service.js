export default function formatRecipeTitle(title) {
    const arr = title.toLowerCase()
        .split(' ')
        .map(word => {
            let letters = word.split('')
            letters[0] = letters[0].toUpperCase()

            return letters.join('')
        })
    return (arr.join(' '))
}