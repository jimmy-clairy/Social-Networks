export const dateParser = (num) => {
    let options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
    }

    let timestamp = Date.parse(num)


    let date = new Date(timestamp).toLocaleDateString('fr-FR', options)

    return date.toString()
}

export const isEmpty = (value) => {
    if (value === undefined || value === null) {
        return true;
    }

    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }

    if (typeof value === 'string') {
        return value.trim().length === 0;
    }

    return false;
};