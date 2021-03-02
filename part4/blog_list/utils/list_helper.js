const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum,cur) => sum+cur.likes,0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((fav, cur) => cur.likes > fav.likes ? cur : fav)
}

const mostBlogs = (blogs) => {
    let temp = {}
    for(let x = 0; x < blogs.length; x++) {
        temp[`${blogs[x].author}`] = (temp.hasOwnProperty(blogs[x].author) ? temp[`${blogs[x].author}`] + 1 : 1)
    }
    let toArray = Object.entries(temp)
    let maxFound = 0
    for(let x = 0; x < toArray.length; x++) {
        if(toArray[x][1] > toArray[maxFound][1]) {
            maxFound = x
        }
    }
    return {
        author: `${toArray[maxFound][0]}`,
        blogs: toArray[maxFound][1]
    }
}

const mostLikes = (blogs) => {
    let temp = {}
    for(let x = 0; x < blogs.length; x++) {
        temp[`${blogs[x].author}`] = (temp.hasOwnProperty(blogs[x].author) ? temp[`${blogs[x].author}`] + blogs[x].likes : blogs[x].likes)
    }
    let toArray = Object.entries(temp)
    let maxFound = 0
    for(let x = 0; x < toArray.length; x++) {
        if(toArray[x][1] > toArray[maxFound][1]) {
            maxFound = x
        }
    }
    return {
        author: `${toArray[maxFound][0]}`,
        likes: toArray[maxFound][1]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}