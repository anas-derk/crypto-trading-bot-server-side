function getCandelType(openPrice, closePrice) {
    return openPrice > closePrice ? "red" : "green";
}

function getCandleTypes(candles) {
    let candleTypes = [];
    for (let candle of candles) {
        const candleType = getCandelType(candle[1], candle[4]);
        candleTypes.push(candleType);
    }
    return candleTypes;
}

function checkCandlesSequence(sequence) {
    if (sequence.length < 2) return false;
    const first = sequence[0]; // نوع الشمعة الأولى (1 أو 0)
    let countFirst = 1;        // أول شمعة محسوبة
    let prev = first;
    // نبدأ من الشمعة الثانية
    for (let i = 1; i < sequence.length; i++) {
        const current = sequence[i];
        // الشرط 1: إذا كانت الشمعة الحالية مثل الأولى ومتصلة بنفس نوعها ⇒ مرفوض
        if (current === first && prev === first) {
            return false;
        }
        // الشرط 2: إذا كانت نفس نوع الشمعة الأولى ⇒ زِد العدّاد
        if (current === first) {
            countFirst++;
            // إذا وصلنا إلى 7 تكرارات ⇒ نجاح وتوقف
            if (countFirst === 7) {
                return true;
            }
        }
        prev = current;
    }
    // إذا ما وصلنا لـ7 => مرفوضة
    return false;
}

module.exports = {
    getCandelType,
    getCandleTypes,
    checkCandlesSequence
}