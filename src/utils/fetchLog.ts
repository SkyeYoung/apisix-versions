import { request } from "@octokit/request";

async function fetchLog(ref:string = 'master') {
    return await request({
        headers: {
            accept: "application/vnd.github.v3+json",
        },
        method: "GET",
        url: "/repos/{owner}/{repo}/contents/{path}?ref={ref}",
        owner: 'apache',
        repo: 'apisix',
        path: 'CHANGELOG.md',
        ref: ref 
    })
    .then((res)=>{
       if(res.status === 200) {
           return atob(res.data.content)
       } else {
           throw new Error(`Stauts Code ${res.status}`)
       }
    })
}

export default fetchLog