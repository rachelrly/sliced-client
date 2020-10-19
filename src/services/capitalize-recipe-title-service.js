export default function formatRecipeTitle(title) {
    const arr = title.toLowerCase()
        .split(' ')
        .map(word => {
            if (word.length) {
                let letters = word.split('')
                letters[0] = letters[0].toUpperCase()

                return letters.join('')
            }
            return ' ';
        })
    return (arr.join(' '))
}