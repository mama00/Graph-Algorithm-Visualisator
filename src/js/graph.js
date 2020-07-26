function generate_graph(){
    let graph={}
    first_row(graph)
    last_row(graph)
    first_column(graph)
    last_column(graph)
    middle(graph)
    return graph
}

function first_row(graph){
    for(let i=0;i<15;i++){
        arr=[]
        if(i!=0){
            arr.push(i+14)
            arr.push(i-1)
        }
        if(i!=14){
            arr.push(i+16)
            arr.push(i+1)
        }
        arr.push(i+15)
        graph[i]=arr;
    }

}

function last_row(graph){
    for(let i=0;i<15;i++){
        let j=15*14+i
        arr=[]
        if(j!=15*14){
            arr.push(j-16)
            arr.push(j-1)
        }
        if(j!=15*14+14){
            arr.push(j-14)
            arr.push(j+1)
        }
        arr.push(j-15)
        graph[j]=arr
    }
}

function first_column(graph){
    for(let i=0;i<15;i++){
        let j=15*i
        arr=[]
        if(j!=0){
            arr.push(j-14)
            arr.push(j-15)
        }
        if(j!=15*14){
            arr.push(j+15)
            arr.push(j+16)
        }
        arr.push(j+1)
        graph[j]=arr
    }

}

function last_column(graph){
    for(let i=0;i<15;i++){
        let j=15*i+14
        arr=[]
        if(i!=0){
            arr.push(j-16)
            arr.push(j-15)
        }
        if(i!=14){
            arr.push(j+15)
            arr.push(j+14)
        }
        arr.push(j-1)
        graph[j]=arr
    }

}

function middle(graph){
    for(let i=1;i<14;i++){
        for(let j=1;j<14;j++){
            arr=[]
            k=i*15+j
            arr.push(k-1)
            arr.push(k+1)
            arr.push(k+15)
            arr.push(k+14)
            arr.push(k+16)
            arr.push(k-15)
            arr.push(k-14)
            arr.push(k-16)
            graph[k]=arr
        }
    }
}


function dfs(graph,origin,destination,viewed,parents){
    viewed.push(origin)
    let temp_org=origin
    let pp=[origin]
    while (parents[temp_org]!=-1){
        pp.push(parents[temp_org])
        temp_org=parents[temp_org]
    }
    scenario.push(pp)
    for(let i=0;i<graph[origin].length;i++){
        if (graph[origin][i]==destination){
            viewed.push(destination)
            parents[destination]=origin
            scenario[scenario.length-1].push(destination)
            return 1
        }
        else if(!viewed.includes(graph[origin][i]) && !murs.includes(graph[origin][i])){
            parents[graph[origin][i]]=origin
            let value=dfs(graph,graph[origin][i],destination,viewed,parents)
            if(value==1)
                return 1
        }
    }

}

function bfs(graph,origin,destination,viewed,parents){
    viewed=[origin]
    stack=[origin]
    let pp=[]
    let temp_org
    let vertice
    scenario=[]
    while(stack.length>0){
        vertice=stack.pop()
        temp_org=vertice
        pp=[vertice]
        while (parents[temp_org]!=-1){
            pp.push(parents[temp_org])
            temp_org=parents[temp_org]
        }
        scenario.push(pp)
        for (let i=0;i<graph[vertice].length;i++){
            if (graph[vertice][i]==destination){
                viewed.push(destination)
                parents[destination]=vertice
                scenario[scenario.length-1].push(destination)
                return 1
            }

            else if(!viewed.includes(graph[vertice][i]) && !murs.includes(graph[vertice][i])){
                stack.unshift(graph[vertice][i])
                viewed.push(graph[vertice][i])
                parents[graph[vertice][i]]=vertice
            }
        }
    }
    
}



