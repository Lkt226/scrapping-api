const axios = require('axios');
const cheerio = require('cheerio');

const actions = {
    getImage(base, search){
        const imgs = []
        base.split('<img').forEach (img => {
            const imgUrl = img.split('>')[0].split('src="')[1]?.split('"')[0]
            if(search){
                if (imgUrl?.search(search) !== -1 && imgUrl){
                    imgs.push(imgUrl)   
                }
            }else{
                if (imgUrl){
                    imgs.push(imgUrl)   
                }
            }
        })
        return imgs
    },
    getLink(base, search){
        const links = []
        base.split('<a').forEach (a => {
            const aLink = a.split('>')[0].split('href="')[1]?.split('"')[0]
            if(links.indexOf(aLink) === -1){
                if(search){
                    if (aLink?.search(search) !== -1 && aLink){
                        links.push(aLink)   
                    }
                }else{
                    if (aLink){
                        links.push(aLink)   
                    }
                }
            }
        })
        return links
    },
    getText(base, element){
        const text = base.split(element)[1]?.split(/<[^br]/g)[0]
        
        return text?.replaceAll('\n', '')
    },
    createObj(base, obj){
        const newObj = {}
        for (let key in obj){
            switch (obj[key].split('*->')[1]) {
                case 'image':
                    newObj[key] = this.getImage(base, obj[key].split('*->')[0])
                    break;
                case 'link':
                    newObj[key] = this.getLink(base, obj[key].split('*->')[0])
                    break;
            
                default:
                    newObj[key] = this.getText(base, obj[key])
                    break;
            }
        }
        return newObj
    },
    extractUrl(url, element){
        return axios(url).then(response => {
            const html = response.data
            const $ = cheerio.load(html).html('main');
            const main = $.split(element)[1];
            return main
        }).catch(console.error);
    }
}
async function scrapping(url, element_base, item) {
    const html = await actions.extractUrl(url, element_base)
    const obj = actions.createObj(html, item)
    return obj
}

module.exports = scrapping;