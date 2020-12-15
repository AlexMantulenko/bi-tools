const useDataAnalyze = () => {
    const average = a => {
        let result = a.reduce((total, item) => total + item, 0);
        result = result / a.length;
        return result;
    }

    const min = col => Math.min(...col);
    const max = col => Math.max(...col);
    
    const median = col => {
        if(col.length === 0) return 0;
        let sorted = asc(col);
        var half = Math.floor(sorted.length / 2);
        if (sorted.length % 2) {
            return sorted[half];
        }
        return (sorted[half - 1] + sorted[half]) / 2.0;
    }

    const mode = col => {
        let distincts = {};

        col.forEach(item => {
            if (distincts[item] !== undefined) ++distincts[item];
            else distincts[item] = 1;
        });

        let values = Object.values(distincts), maxCount = Math.max(...values);

        for(let key in distincts) {
            if(distincts[key] === maxCount) {
                return key;
            }
        }
    }

    const pearsonCorr = cols => {
        let { x, y } = cols;

        if(x.length === 0 || y.length === 0) {
            alert('Please select columns');
            return;
        }
        if(x.some(item => typeof(item) == 'string') || y.some(item => typeof(item) == 'string')) {
            return false;
        }

        let xAvg = average(x), yAvg = average(y), sum1 = 0;
        
        for(let i = 0; i < x.length; i++) {
            sum1 = sum1 + (x[i] - xAvg) * (y[i] - yAvg);
        }

        let sum2 = x.reduce((total, item) => total + (item - xAvg) ** 2, 0);
        let sum3 = y.reduce((total, item) => total + (item - yAvg) ** 2, 0);
        let r = (sum1 / (Math.sqrt(sum2) * Math.sqrt(sum3))).toFixed(2);

        return r;
    }


    const asc = arr => arr.sort((a, b) => a - b);

    const quantile = (arr, q) => { 
        const sorted = asc(arr);
        const pos = (sorted.length - 1) * q;
        const base = Math.floor(pos);
        const rest = pos - base;
        if(arr.some(item => typeof(item) === "string")) {
            return NaN;
        }
        if (sorted[base + 1] !== undefined) {
            return (sorted[base] + rest * (sorted[base + 1] - sorted[base])).toFixed(5);
        } 
        else {
           return sorted[base].toFixed(5);
        }
    }

    const sum = arr => arr.reduce((a, b) => a + b, 0);

    const std = arr => {
        const mu = average(arr);
        const diffArr = arr.map(a => (a - mu) ** 2);
        return Math.sqrt(sum(diffArr) / (arr.length - 1));
    };
 
    const skew = arr => {  
        let n = arr.length, xAvg = average(arr);
        let sum = arr.reduce((total, x) => total + (x - xAvg) ** 3, 0);
        return sum / ((n - 1) * Math.pow(std(arr), 3));
    } 

    return { max, min, median, mode, mean: average, quantile, std, skew, pearsonCorr };
}

export default useDataAnalyze;