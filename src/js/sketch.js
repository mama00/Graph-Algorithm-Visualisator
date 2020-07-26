
class Point{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}
let points=[]
let graph={}
let viewed=[]
let parents={}
let scenario=[]
let index_scenario=0
let murs=[]
let sel
let button
let mode_button=0 //0 normal 1 wall

//Helpers functions/////////////////////////////////
function draw_points(points,color=123){
    for(let i=0;i<points.length;i++){
        fill(color);
        rect(points[i].x*40,points[i].y*40,40,40)
    }
}
function draw_board(){
    for(let i=0;i<16;i++){
        line(i*40,0,i*40,600)
        line(0,i*40,600,i*40)
    }
}

function draw_scenario(){
        fill('Red');
        if (scenario.length>0){
            for(let i=0;i<scenario[index_scenario].length;i++){
    
                posx=int(scenario[index_scenario][i]/15)
                posy=scenario[index_scenario][i]%15
                rect(posy*40+10,posx*40+10,10,10)
            }
            index_scenario++
            if(index_scenario==scenario.length){
                index_scenario--
                noLoop()
            }
        }
}

function convert_to_point(value){
    posx=int(value/15)
    posy=value%15
    return new Point(posy,posx)
}

function convert_array_to_points(arr){
    arr_p=[]
    for (let i=0;i<arr.length;i++){
        arr_p.push(convert_to_point(arr[i]))
    }
    return arr_p;
}
function draw_neighbor(point){
    for(let i=0;i<graph[point].length;i++){
        posx=int(graph[point][i]/15)
        posy=graph[point][i]%15
        rect(posy*40,posx*40,40,40)
    }
}

function wall_selected(){
    mode_button= mode_button ^ 1
    if(mode_button==1){
        button.elt.innerHTML="Create Points"
    }else if(mode_button==0){
        button.elt.innerHTML='Create Wall'
    }
}
function reset_screen(){
    points=[]
    scenario=[]
    index_scenario=0
    parents={}
    mode_button=0
    redraw()
    loop()
}
/////////////////////////////////////////////////////

//p5.js code//////////////////////
function setup(){
    frameRate(5)
    createCanvas(600,600)
    sel = createSelect();
    sel.position(10, 10);
    sel.option('Breadth first search');
    sel.option('Depth first search');
    sel.position(40,620)
    sel.changed(reset_screen)
    button=createButton("Create Wall")
    button.position(280,620)
    button.mousePressed(wall_selected)
    graph=generate_graph()

    }


function mouseClicked(){
    let posx=int(mouseX/40);
    let posy=int(mouseY/40);
    if(posx<=14 && posy<=14){
        if( mode_button==0){

            points.push(new Point(posx,posy));
            if(points.length==2){
                source=points[0].y*15+points[0].x
                destination=points[1].y*15+points[1].x
                parents={}
                parents[source]=-1
                print(source,destination)
                noLoop()
                if(sel.value()=='Depth first search'){
                    viewed=[]
                    if(dfs(graph,source,destination,viewed,parents)!=1){
                        console.log(scenario)
                        alert("not found")
                    }
    
                }
                else if(sel.value()=='Breadth first search'){
                    if(bfs(graph,source,destination,viewed,parents)!=1)
                        alert("not found")
                }
                loop()
            }
        }
        else if(mode_button==1){
            murs.push(posy*15+posx)
        }

    }

}


function draw(){
    background(255)
    draw_board()
    draw_points(points)
    draw_points(convert_array_to_points(murs),0)
    draw_scenario()
}