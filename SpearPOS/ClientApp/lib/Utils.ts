export class DateFormatter {
    public static Format(date: any) {
        return new Date(date).toLocaleString();
    }
}