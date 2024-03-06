export default async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, options)

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error)
        }
        return data
    } catch (error) {
        throw error
    }
}