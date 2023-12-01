export const load = async()=>{
    const data = (await import('$lib/Json/Clustering.json'))['default']
    // console.log(data)
    delete data['Cluster']

    return {
        csv_data:data
    }
}