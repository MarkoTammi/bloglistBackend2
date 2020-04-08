
// For blog backend testing

const dummy = (blogs) => {
    return 1
}


// TEST - 4.4: apufunktioita ja yksikkötestejä, step2
// Laskee blogi kirjoitusten "likes" lukumäärän yhteen
const countTotalLikes = (blogs) => {
    //console.log('BLOGS', blogs[1].likes)
    let sum = 0
    for (const like in blogs) {
        sum = sum + blogs[like].likes
    }
    return sum
}

module.exports = {
    dummy,
    countTotalLikes
}