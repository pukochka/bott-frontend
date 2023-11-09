// Сокращение для цен
String.prototype.comma = function (value?: string) {
    return (value ?? '') + ((Number(this) ?? 0) / 100).toFixed(2) + ' ₽';
};
Number.prototype.comma = function (value?: string) {
    return (value ?? '') + ((Number(this) ?? 0) / 100).toFixed(2) + ' ₽';
};