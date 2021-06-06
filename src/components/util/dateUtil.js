import moment from "moment";

export function formatDate(date) {
    return moment(date).format("DD.MM.YYYY");
}

export function formatDateTime(dateTime) {
    return moment(dateTime).format("DD.MM.YYYY hh:mm a");
}

    