export function sortLowerPrice (data: any[]) {
 data.sort(function(a,b){
    return a.cost-b.cost;
 })
}

export function sortHigherPrice (data: any[]) {
    data.sort(function(a,b){
        return b.cost-a.cost
    })
}
export function sortMostRecently (data: any[]) {
    
    console.log(data)
}